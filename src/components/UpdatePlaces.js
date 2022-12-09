import Button from "@mui/material/Button";

function UpdatePlaces(props) {
    return (
        <div sx={{mt: 15}} id="actions" className="esri-widget">
            <Button disabled sx={{mt: 5}} size="large" variant="outlined" id="add" style={{width: "auto"}}>UPDATE DATA
            </Button>
        </div>
    )
}

export default UpdatePlaces;