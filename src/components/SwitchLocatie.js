import * as React from "react";
import {styled} from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch, {SwitchProps} from "@mui/material/Switch";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({theme}) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
        padding: 0,
        margin: 2,
        transitionDuration: "300ms",
        "&.Mui-checked": {
            transform: "translateX(16px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
                backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#ffb14e",
                opacity: 1,
                border: 0
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: 0.5
            }
        },
        "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: "#33cf4d",
            border: "6px solid #fff"
        },
        "&.Mui-disabled .MuiSwitch-thumb": {
            color:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600]
        },
        "&.Mui-disabled + .MuiSwitch-track": {
            opacity: theme.palette.mode === "light" ? 0.7 : 0.3
        }
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 22,
        height: 22
    },
    "& .MuiSwitch-track": {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
        opacity: 1,
        transition: theme.transitions.create(["background-color"], {
            duration: 500
        })
    }
}));

export default function SwitchLocatie(props) {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        // props.busStationsState.current.visible = event.target.checked;
        props.gebiedRef.current.whenLayerView(props.busStationsLyrRef.current).then(function (layerView) {
            // now we have access to the layerView, an
            // object representing the layer in the view
            if (event.target.checked) {
                props.busStationsLyrRef.current.definitionExpression = "stationID > 0";
            } else {
                props.busStationsLyrRef.current.definitionExpression = "stationID not in (15)"
            }
            // props.busStationsLyrRef.current.definitionExpression = "stationID = "+event.target.value+"";
        });
    };
    return (
        <FormGroup sx={{mt: 5}}>
            <FormControlLabel
                control={<IOSSwitch sx={{m: 1}}
                                    checked={checked}
                                    onChange={handleChange}/>}
                label="Locatie meetellen"
            />
        </FormGroup>
    );
}
