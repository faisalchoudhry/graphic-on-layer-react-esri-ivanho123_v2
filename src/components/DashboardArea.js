import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import React, {useEffect} from "react";

function DashbaordArea(props) {
    const [tijd_prijs_1, setTijdPrijs1State] = React.useState(0);
    const [tijd_prijs_2, setTijdPrijs2State] = React.useState(0);

    useEffect(
        () => {
            if (props.tijd_prijs_1_ref.current) {
                setTijdPrijs1State(props.tijd_prijs_1_ref.current);
                setTijdPrijs2State(props.tijd_prijs_2_ref.current);
            }
        }, [props.tijd_prijs_1_ref.current]);

    return (
        <div style={{marginTop: "5%", marginBottom: 7}}>
            <Card sx={{minWidth: 300, backgroundColor: "#cee4ff", minHeight: 20}}>
                <CardContent sx={{paddingLeft: 5, paddingRight: 5}}>
                    <Typography sx={{fontSize: 18, fontWeight: "bold"}} color="" gutterBottom style={{left: 0}}>
                        Output Dashboard
                    </Typography>
                    <Divider sx={{mt: 2}} color="orange" style={{width: "50px", height: "1px"}}></Divider>
                    <Typography sx={{mt: 1, mb: 1.5}}>
                        Basis : {tijd_prijs_1}
                    </Typography>
                    <Typography>
                        Scenario : {tijd_prijs_2}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashbaordArea;