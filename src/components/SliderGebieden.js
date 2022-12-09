import React, {useEffect} from 'react';
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";
import DashbaordArea from "./DashboardArea";

function calculateValue(value: number) {
    return 1 + value;
}

function SliderGebieden(props) {
    const [gebiedenValue, setGebiedenValue] = React.useState(0);
    const [marktwaardeValue, setMarktwaardeValue] = React.useState(2000);
    const API_KEY = '5c953897c0c2990b47baa6742b6140b4';
    /*const sliderHandleChange = (event: Event, newValue: number | number[]) => {
        // if (typeof newValue === 'number') {
        setValue(newValue);
        // }
    };*/

    const handleChangeSlider = (event: Event, newValue: number | number[], sliderName) => {
        if (sliderName === "gebiedenSlider"){
            setGebiedenValue(newValue);
            fetchApiData();
        }else if (sliderName === "marktwaardeSlider"){
            setMarktwaardeValue(newValue);
            fetchApiData();
        }

    };

    const fetchApiData = async () => {
        const _id = '638afcb1852ef20288b83160'
        const jsn = {
            "effectIndex": "" + {gebiedenValue} + "",
            "effectMarket": "" + {marktwaardeValue} + "",
            "useStation1": true,
            "routeVariant": "1",
            "scenario": 1,
            "distanceStation": true
        }
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg4NjVhZTFkMTYwNjY5MjA2ZTdjNGYiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NzA0MjI2NTgsImV4cCI6MTY3MDY4MTg1OH0.4tPaqRWwaMmGI4R-sDZh7ju1fNNhaFRs1N0KC46-Z4E',
                'id': {key: '_id', value: '638afcb1852ef20288b83160'}
            },
            body: JSON.stringify(jsn)
        };

        fetch("https://backendmodule-2.herokuapp.com/api/v1/parameter/" + _id, requestOptions).then((response) => response.json())
            .then((json) => {
                json.data.places.map((item, i) => {
                    props.tijd_prijs_1_ref.current = parseInt(props.tijd_prijs_1_ref.current) + parseInt(item.attributes.TIJD_PRIJS_1);
                    props.tijd_prijs_2_ref.current = parseInt(props.tijd_prijs_2_ref.current) + parseInt(item.attributes.TIJD_PRIJS_2);
                });
                // tijd_prijs_1_status_ref.current = false;
                props.tijd_prijs_1_ref.current = props.tijd_prijs_1_ref.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                props.tijd_prijs_2_ref.current = props.tijd_prijs_2_ref.current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                props.setTijd_prijs_2_state(props.tijd_prijs_1_ref.current);
            });
    }

    useEffect(
        () => {
            fetchApi();
        }, []);
    const fetchApi = async () => {
        const data = await fetch("https://backendmodule-2.herokuapp.com/api/v1/parameter?api_key=" + API_KEY + "").then(res => res.json()).then((result) => {
            // setValue({
            {
                result.data.reduce((item, current, i) => {
                    if (i < 1) {
                        console.log(current.effectIndex);
                        setGebiedenValue(parseInt(current.effectIndex));
                        setMarktwaardeValue(parseInt(current.effectMarket));
                    }
                    return result;
                }, [])
            }
            // result.data.map((item, i =0)=> {
            //     console.log(item.effectIndex);
            //     // effectIndex: "effectIndex"
            // })
            // })
        }).catch(console.log);
    }

    return (
        <Box>
            {/*<DashbaordArea tijd_prijs_1_ref={props.tijd_prijs_2_ref}*/}
            {/*               tijd_prijs_2_ref={props.tijd_prijs_2_ref}></DashbaordArea>*/}
            <Typography id="non-linear-slider" sx={{mt: 1}} color="text.secondary">
                EFFECT: {gebiedenValue} %
            </Typography>
            <Slider sx={{mt: 0.5}}
                    value={gebiedenValue}
                    min={0}
                    step={1}
                    max={20}
                    name="gebiedenSlider"
                // scale={calculateValue}
                // getAriaValueText={calculateValue}
                // valueLabelFormat={calculateValue}
                // onChange={sliderHandleChange}
                    valueLabelDisplay="auto"
                    onChangeCommitted={(e,v)=>handleChangeSlider(e,v,"gebiedenSlider")}
                    aria-labelledby="non-linear-slider"
            />
            <Divider sx={{mt: 5}} color="orange" style={{width: "50px", height: "1px"}}></Divider>
            <Typography id="non-linear-slider" sx={{mt: 1}} color="text.secondary">
                MARKTWAARDE: {marktwaardeValue} €
            </Typography>
            <Slider sx={{mt: 0.5}}
                    name="marktwaardeSlider"
                    value={marktwaardeValue}
                    min={2000}
                    step={100}
                    max={6000}
                    valueLabelDisplay="auto"
                // scale={calculateValue}
                // getAriaValueText={calculateValue}
                // valueLabelFormat={calculateValue}
                // onChange={sliderHandleChange}
                    onChangeCommitted={(e,v)=>handleChangeSlider(e,v,"marktwaardeSlider")}
                    aria-labelledby="non-linear-slider"
            />
        </Box>
    )

}

export default SliderGebieden;