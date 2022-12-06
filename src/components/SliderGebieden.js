import React, {useEffect} from 'react';
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CardContent from "@mui/material/CardContent";


function calculateValue(value: number) {
    return 1 + value;
}

function SliderGebieden() {
    const [gebiedenValue, setGebiedenValue] = React.useState(0);
    const [marktwaardeValue, setMarktwaardeValue] = React.useState(2000);
    const API_KEY = '5c953897c0c2990b47baa6742b6140b4';
    /*const sliderHandleChange = (event: Event, newValue: number | number[]) => {
        // if (typeof newValue === 'number') {
        setValue(newValue);
        // }
    };*/

    const handleChangeCommitted = (event: Event, newValue: number | number[]) => {
        // if (typeof newValue === 'number') {
        setGebiedenValue(newValue);
        // }
    };
    const handleChangeCommittedM = (event: Event, newValue: number | number[]) => {
        // if (typeof newValue === 'number') {
        setMarktwaardeValue(newValue);
        // }
    };

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
            <Typography id="non-linear-slider" sx={{mt: 1}} color="text.secondary">
                EFFECT: {gebiedenValue} %
            </Typography>
            <Slider sx={{mt: 0.5}}
                    value={gebiedenValue}
                    min={0}
                    step={1}
                    max={20}
                // scale={calculateValue}
                // getAriaValueText={calculateValue}
                // valueLabelFormat={calculateValue}
                // onChange={sliderHandleChange}
                    onChangeCommitted={handleChangeCommitted}
                    aria-labelledby="non-linear-slider"
            />
            <Divider sx={{mt: 5}} color="orange" style={{width: "50px", height: "1px"}}></Divider>
            <Typography id="non-linear-slider" sx={{mt: 1}} color="text.secondary">
                MARKTWAARDE: {marktwaardeValue} €
            </Typography>
            <Slider sx={{mt: 0.5}}
                    value={marktwaardeValue}
                    min={2000}
                    step={100}
                    max={6000}
                // scale={calculateValue}
                // getAriaValueText={calculateValue}
                // valueLabelFormat={calculateValue}
                // onChange={sliderHandleChange}
                    onChangeCommitted={handleChangeCommittedM}
                    aria-labelledby="non-linear-slider"
            />
        </Box>
    )

}

export default SliderGebieden;