import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import React from "react";
// import {countries} from "../countries";
import MenuItem from "@mui/material/MenuItem";
import {SelectChangeEvent} from "@mui/material";

const getCountry = (props) => {
    try {
        if (props.country.result.data.gebieden.length > 0) {
            return props.country.result.data.gebieden.map((country,i) => {
                return <MenuItem key={i} value={country}>{country}
                </MenuItem>;
            });
        } else {
            // return <MenuItem value='0'>
            //     </MenuItem>;
        }
    }catch (e) {
        console.log(e)
    }
}


const GebiedenSelectList = (props) => {
    const [gebieden, setGebieden] = React.useState('');

    // const handleChange = (e) => {
    //     setGebieden({selectValue: e.target.value});
    //     console.log(e.target.value);
    //     console.log(gebieden);
    // }
    const handleChange = (event: SelectChangeEvent) => {
        setGebieden(event.target.value);
        // console.log(gebieden)
        // console.log(event.target.value)
    };
    return (
        <FormControl fullWidth sx={{mt: 2}}>
            <InputLabel id="demo-simple-select-label">GEBIEDEN</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="GEBIEDEN"
                // className="form-control"
                // aria-label="Floating label select example"
                value={gebieden}
                onChange={handleChange}>
                {getCountry(props)}
            </Select>
        </FormControl>
    )
}

export default GebiedenSelectList;