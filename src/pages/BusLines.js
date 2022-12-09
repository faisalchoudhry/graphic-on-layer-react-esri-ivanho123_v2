import React, {useEffect} from 'react';
import {loadModules} from "esri-loader";

const BusLines = (props) => {
    // const [busLines, setBusLines] = useState([]);
    // const API_KEY_LINES = 'test123';
    // useEffect(
    //     () => {
            loadModules(["esri/layers/FeatureLayer", "esri/Graphic", "esri/geometry/SpatialReference"]
                , {
                css: true
            }).then(([FeatureLayer, Graphic, SpatialReference]) => {
                try {
                    if (props.BusLines.result.paths.length > 0) {

                        const responseDataBusLines = props.BusLines;

                        // spatial reference of base map and dataset is in wkid 28992
                        const dataSR = new SpatialReference({wkid: 28992});

                        // Bus Lines Graphics
                        const busLinesGraphics = responseDataBusLines.result.paths.map((item, i) => new Graphic({
                            "geometry": {
                                type: "polyline",
                                "paths": props.BusLines.result.paths,
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

                        // let legend = new Legend({
                        //     view: view,
                        //     layerInfos: [{title: "Places", layer: placesLyr}] /*,{title: "Bus Line", layer: BusLineLyr}*/
                        // }, "legend");

                        props.mapRef.current.add(BusLineLyr);

                        // view.ui.add(legend, "bottom-left");

                    } else {
                        // console.log("no country");
                    }
                } catch (e) {

                }
            });

        // },[]);


    // useEffect(
    //     () => {
    // //         fetch();
    // //     }, []);
    // // const fetch = async () => {
    //     const data2 = fetch("https://71e21474-148c-4a84-9458-b953d27ba00b.mock.pstmn.io/api/v1/lines?API_KEY=" + API_KEY_LINES + "").then(res => res.json()).then(result => setBusLines({
    //         result
    //     })).catch(console.log);
    // });

    return (
        <>
        </>
    );

}

export default BusLines;