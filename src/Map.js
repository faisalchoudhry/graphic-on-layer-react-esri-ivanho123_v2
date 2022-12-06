import React, {useEffect, useRef, useState, lazy, Suspense} from 'react';
import {loadModules} from "esri-loader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {countries} from "./countries";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Slider from "@mui/material/Slider";
import SliderGebieden from "./components/SliderGebieden";
import SliderMarktwaarde from "./components/SliderMarktwaarde";
import SwitchLocatie from "./components/SwitchLocatie";
import GebiedenSelectList from "./components/GebiedenSelectList";

const UpdatePlaces = lazy(() => import("./UpdatePlaces"));


const Maps = () => {
    let view, beginScale;
    const MapElement = useRef(null);
    const beginScaleRef = useRef(8);
    const [country, setCountry] = useState([]);
    const [busLines, setBusLines] = useState([]);
    const [busStations, setBusStations] = useState([]);
    const API_KEY = '5c953897c0c2990b47baa6742b6140b4';
    const API_KEY_LINES = 'test123';
    // const [value, setValue] = React.useState(1);
    useEffect(
        () => {
            loadModules(["esri/views/MapView", "esri/Map", "esri/layers/FeatureLayer", "esri/Graphic", "esri/geometry/SpatialReference",
                "esri/widgets/Legend", "esri/core/watchUtils", "esri/geometry/Polyline"], {
                css: true
            }).then(([MapView, Map, FeatureLayer, Graphic, SpatialReference, Legend, watchUtils, Polyline]) => {
                //Map will be created here
                const map = new Map({
                    basemap: 'topo-vector',
                });

                try {
                    if (country.result.data.places.length > 0) {
                        view = new MapView({
                            // spatialReference: 28992,
                            zoom: beginScaleRef.current, //Zoom Level can be Between 0 to 23
                            center: [5.3093833, 52.1585149], //longitude, latitude
                            container: MapElement.current,
                            map: map //map created above
                        });

                        view.when(function () {
                            // MapView is now ready for display and can be used. Here we will
                            // use goTo to view a particular location at a given zoom level and center
                            view.goTo({
                                center: [5.3093833, 52.1585149],
                                // zoom: 12
                                zoom: beginScaleRef.current,
                            });
                        })
                            .catch(function (err) {
                                // A rejected view indicates a fatal error making it unable to display.
                                // Use the errback function to handle when the view doesn't load properly
                                console.error("MapView rejected:", err);
                            });

                        watchUtils.when(view, "interacting", function () {
                            beginScale = view.get('scale');
                        });

                        watchUtils.when(view, "stationary", function () {
                            const currentScale = view.get('scale');
                            if (currentScale !== beginScale) {
                                beginScaleRef.current = view.get('zoom');
                            }
                        });

                        const responseData = country;
                        const responseDataBusLines = busLines;
                        const responseDataBusStations = busStations;

                        // spatial reference of base map and dataset is in wkid 28992
                        const dataSR = new SpatialReference({wkid: 28992});

                        // Places Graphics
                        const placesGraphics = responseData.result.data.places.map((item, i) => new Graphic({
                            geometry: {
                                spatialReference: dataSR,
                                type: 'polygon',
                                rings: item.geometry.rings
                            },
                            attributes: {
                                ObjectID: i,
                                naam: item.attributes.naam,
                                TIJD_PRIJS_1: parseInt(item.attributes.TIJD_PRIJS_1),
                                TIJD_PRIJS_11: item.attributes.TIJD_PRIJS_1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                                Oppervlakte: item.attributes.Area
                            }

                        }));

                        const placesLyr = new FeatureLayer({
                            source: placesGraphics,  // array of graphics objects
                            objectIdField: "OBJECTID",
                            fields: [{
                                name: "OBJECTID",
                                type: "oid"
                            }, {
                                name: "naam",
                                type: "string"
                            }, {
                                name: "TIJD_PRIJS_1",
                                type: "integer"
                            }, {
                                name: "TIJD_PRIJS_11",
                                type: "string"
                            }, {
                                name: "Oppervlakte",
                                type: "string"
                            }],
                            popupTemplate: {
                                content: "<div><h3 class='titlePopup'>Projectebied:  {naam}</h3>" +
                                    "<div><table class='customers'>" +
                                    "<tr style='text-align: left'><th>Naam</th><th>{Naam}</th></tr>" +
                                    "<tr style='text-align: left'><th>Effect on project</th><th>{TIJD_PRIJS_11}</th></tr>" +
                                    "<tr style='text-align: left'><th>m2 kavel</th><th>{Oppervlakte}</th></tr>" +
                                    "</table></div>" +
                                    "</div>"
                            },
                            renderer: {  // overrides the layer's default renderer
                                type: "simple",
                                symbol: {
                                    type: "simple-fill",
                                    // color: "#61ee57",
                                    // text: "\ue661",
                                    // font: {
                                    //     size: 20,
                                    //     family: "CalciteWebCoreIcons"
                                    // }
                                },
                                // },
                                visualVariables: [
                                    {
                                        type: "color",
                                        field: "TIJD_PRIJS_1",
                                        stops: [
                                            {value: 5000000, color: "#2ECEA2"},
                                            {value: 4000000, color: "#2EA7AB"},
                                            {value: 3000000, color: "#5DA484"},
                                            {value: 2000000, color: "#F9DC90"},
                                            {value: 1000000, color: "#B27829"}
                                        ]
                                    }

                                ]
                            }
                        });

                        // Bus Station Graphics
                        const busStationGraphics = responseDataBusStations.result.data.stations.map((item, i) => new Graphic({
                            geometry: {
                                spatialReference: dataSR,
                                type: 'polygon',
                                rings: item.geometry.rings
                            },
                            attributes: {
                                ObjectID: i,
                                stationsnaam: item.attributes.stationsnaam,
                                gebied: item.attributes.gebied,
                                status: item.attributes.status,
                                statusActief: item.attributes.statusActief,
                                LINE_1: item.attributes.LINE_1,
                                LINE_2: item.attributes.LINE_2,
                                LINE_3: item.attributes.LINE_3,
                                LINE_4: item.attributes.LINE_4,
                            }

                        }));

                        const busStationLyr = new FeatureLayer({
                            source: busStationGraphics,  // array of graphics objects
                            objectIdField: "OBJECTID",
                            fields: [{
                                name: "OBJECTID",
                                type: "oid"
                            }, {
                                name: "stationsnaam",
                                type: "string"
                            }, {
                                name: "gebied",
                                type: "string"
                            }, {
                                name: "status",
                                type: "string"
                            }, {
                                name: "statusActief",
                                type: "string"
                            }, {
                                name: "LINE_1",
                                type: "string"
                            }, {
                                name: "LINE_2",
                                type: "string"
                            }, {
                                name: "LINE_3",
                                type: "string"
                            }, {
                                name: "LINE_4",
                                type: "string"
                            }],
                            popupTemplate: {
                                content: "<div><h3 class='titlePopup'>Projectebied:  {stationsnaam}</h3>" +
                                    "<div><table class='customers'>" +
                                    "<tr style='text-align: left'><th>Stations Naam</th><th>{stationsnaam}</th></tr>" +
                                    "<tr style='text-align: left'><th>Gebied</th><th>{gebied}</th></tr>" +
                                    "<tr style='text-align: left'><th>Status</th><th>{status}</th></tr>" +
                                    "<tr style='text-align: left'><th>Status Actief</th><th>{statusActief}</th></tr>" +
                                    "<tr style='text-align: left'><th>LINE_1</th><th>{LINE_1}</th></tr>" +
                                    "<tr style='text-align: left'><th>LINE_2</th><th>{LINE_2}</th></tr>" +
                                    "<tr style='text-align: left'><th>LINE_3</th><th>{LINE_3}</th></tr>" +
                                    "<tr style='text-align: left'><th>LINE_4</th><th>{LINE_4}</th></tr>" +
                                    "</table></div>" +
                                    "</div>"
                            },
                            renderer: {  // overrides the layer's default renderer
                                type: "simple",
                                symbol: {
                                    type: "simple-fill",
                                    color: "#2ECEA2",
                                },

                            }
                        });

                        // Bus Lines Graphics
                        const busLinesGraphics = busLines.result.paths.map((item, i) => new Graphic({
                            "geometry": {
                                type: "polyline",
                                "paths": busLines.result.paths,
                                spatialReference: dataSR,
                            }
                        }));

                        // Set the renderer on the layer
                        const BusLineLyr = new FeatureLayer({
                            source: busLinesGraphics,
                            fields: [],
                            objectIdField: "ObjectID",
                            spatialReference: dataSR,
                            geometryType: "polyline",
                            renderer: {
                                type: "simple",
                                symbol: {
                                    type: "simple-line", // autocasts as new SimpleLineSymbol()
                                    color: "#61ee57",
                                    width: 3
                                },
                            }
                        });

                        let legend = new Legend({
                            view: view,
                            layerInfos: [{title: "Places", layer: placesLyr}] /*,{title: "Bus Line", layer: BusLineLyr}*/
                        }, "legend");

                        map.add(placesLyr);
                        map.add(BusLineLyr);
                        map.add(busStationLyr);

                        view.ui.add(legend, "bottom-left");

                    } else {
                        // console.log("no country");
                    }
                } catch (e) {

                }
            });

        },);


    // const sliderHandleChange = (event: Event, newValue: number | number[]) => {
    //     if (typeof newValue === 'number') {
    //         setValue(newValue);
    //     }
    // };
    //
    // function calculateValue(value: number) {
    //     return 1 + value;
    // }

    useEffect(
        () => {
            fetchApiOnLoad();
        }, []);
    const fetchApiOnLoad = async () => {
        const data = await fetch("https://backendmodule-2.herokuapp.com/api/v1/places?api_key=" + API_KEY + "").then(res => res.json()).then(result => setCountry({
            result
        })).catch(console.log);
        const data2 = await fetch("https://71e21474-148c-4a84-9458-b953d27ba00b.mock.pstmn.io/api/v1/lines?API_KEY=" + API_KEY_LINES + "").then(res => res.json()).then(result => setBusLines({
            result
        })).catch(console.log);
        const data3 = await fetch("https://backendmodule-2.herokuapp.com/api/v1/stations?api_key=" + API_KEY + "").then(res => res.json()).then(result => setBusStations({
            result
        })).catch(console.log);
    }

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: "10%",
                    // padding: 10,
                    right: 10,
                    // backgroundColor: "#F2F2F2",
                    borderRadius: 5,
                    zIndex: 1000,
                }}
            >
                {/* <input value={"text"} type={"text"} /> */}
                <div style={{marginBottom: 7}}>
                    <Card sx={{minWidth: 300}}>
                        <CardContent sx={{paddingLeft: 5, paddingRight: 5}}>
                            <Typography sx={{fontSize: 18, fontWeight: "bold"}} color="" gutterBottom style={{left: 0}}>
                                Parameters
                            </Typography>
                            <Divider sx={{mt: 2}} color="orange" style={{width: "50px", height: "1px"}}></Divider>
                            <GebiedenSelectList country={country}></GebiedenSelectList>
                            <SwitchLocatie></SwitchLocatie>
                            <Divider sx={{mt: 5}} color="orange" style={{width: "50px", height: "1px"}}></Divider>
                            <SliderGebieden></SliderGebieden>
                            {/*<Divider sx={{mt: 5}} color="orange" style={{width: "50px", height: "1px"}}></Divider>*/}
                            {/*<SliderMarktwaarde></SliderMarktwaarde>*/}
                            <Suspense fallback={<div style={{bottom: 0, position: "absolute"}}>Please wait...</div>}>
                                <UpdatePlaces country={setCountry}></UpdatePlaces>
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
            {/*Output Dashboard*/}
            <div
                style={{
                    position: "absolute",
                    bottom: "2%",
                    // padding: 10,
                    right: 10,
                    // backgroundColor: "#F2F2F2",
                    borderRadius: 5,
                    zIndex: 1000,
                }}
            >
                {/* <input value={"text"} type={"text"} /> */}
                <div style={{marginBottom: 7}}>
                    <Card sx={{minWidth: 300, backgroundColor: "#cee4ff", minHeight: 20}}>
                        <CardContent sx={{paddingLeft: 5, paddingRight: 5}}>
                            <Typography sx={{fontSize: 18, fontWeight: "bold"}} color="" gutterBottom style={{left: 0}}>
                                Output Dashboard
                            </Typography>
                            <Divider sx={{mt: 2}} color="orange" style={{width: "50px", height: "1px"}}></Divider>
                            <Typography sx={{mt: 1, mb: 1.5}}>
                                Basis
                            </Typography>
                            <Typography>
                                Scenario
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div style={{height: 600}} ref={MapElement}>
            </div>

        </>
    );

}

export default Maps;