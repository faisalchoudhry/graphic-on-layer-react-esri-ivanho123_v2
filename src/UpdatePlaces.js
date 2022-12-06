import Button from "@mui/material/Button";

function UpdatePlaces(props) {
    const fetchApiData = async () => {
        const data = await fetch("https://ba899dea-d673-44ac-b57f-29155287ffd5.mock.pstmn.io/places_updated").then(res => res.json()).then(result => props.country({
            result
        })).catch(console.log);
        // console.log(props.country);
    }

    return (
        <div sx={{mt: 15}} id="actions" className="esri-widget">
            <Button sx={{mt: 5}} size="large" variant="outlined" id="add" style={{width: "auto"}}
                    onClick={fetchApiData}>UPDATE DATA
            </Button>
        </div>
    )
}

export default UpdatePlaces;