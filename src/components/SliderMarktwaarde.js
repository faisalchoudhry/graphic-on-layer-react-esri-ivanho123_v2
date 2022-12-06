import React from 'react';
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


function calculateValue(value: number) {
    return 1 + value;
}

function SliderMarktwaarde() {
    const [value, setValue] = React.useState(2000);

    /*const sliderHandleChange = (event: Event, newValue: number | number[]) => {
        // if (typeof newValue === 'number') {
        setValue(newValue);
        // }
    };*/
    const handleChangeCommitted = (event: Event, newValue: number | number[]) => {
        // if (typeof newValue === 'number') {
        setValue(newValue);
        // }
    };


    return (
        <Box>
            <Typography id="non-linear-slider" sx={{mt: 1}} color="text.secondary">
                MARKTWAARDE: {value} €
            </Typography>
            <Slider sx={{mt: 0.5}}
                value={value}
                min={2000}
                step={100}
                max={6000}
                // scale={calculateValue}
                // getAriaValueText={calculateValue}
                // valueLabelFormat={calculateValue}
                // onChange={sliderHandleChange}
                onChangeCommitted={handleChangeCommitted}
                aria-labelledby="non-linear-slider"
            />
        </Box>
    )

}

export default SliderMarktwaarde;