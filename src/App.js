import AppBar from "./components/AppBar";
import Map from './Map';
import {BrowserRouter} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

function App() {
    return (
        < BrowserRouter>
        <div className="App">
            <AppBar></AppBar>
            {/*<Map></Map>*/}
        </div>
        </BrowserRouter>
    );
}

export default App;
