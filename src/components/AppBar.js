import * as React from 'react';
import {Route, Routes, Link, Outlet, NavLink} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ErrorPage from "./ErrorPage";
import Gegevens from "../pages/Gegevens";
import Projecten from "./Projecten";
import Colofon from "../pages/Colofon";
import Maps from "../Map";

export default function ButtonAppBar() {

    function Layout() {
        return (
            <div>
                <Box sx={{flexGrow: 1}}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                                Application
                            </Typography>
                            <NavLink className={({isActive}) =>
                                (isActive ? "active-class navlinkCss" : "not-active-class navlinkCss")} size="large"
                                     component={Link}
                                     color="inherit" to="/">Main</NavLink>
                            <NavLink className={({isActive}) =>
                                (isActive ? "active-class navlinkCss" : "not-active-class navlinkCss")} size="large"
                                     component={Link}
                                     color="inherit" to="/Gegevens">Gegevens</NavLink>
                            <NavLink className={({isActive}) =>
                                (isActive ? "active-class navlinkCss" : "not-active-class navlinkCss")} size="large"
                                     component={Link}
                                     color="inherit" to="/Projecten">Projecten</NavLink>
                            <NavLink className={({isActive}) =>
                                (isActive ? "active-class navlinkCss" : "not-active-class navlinkCss")} size="large"
                                     component={Link}
                                     color="inherit" to="/Colofon">Colofon</NavLink>
                        </Toolbar>
                    </AppBar>
                </Box>
                <Outlet/>
            </div>
        );
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index path="/" element={<Maps/>}/>
                    <Route path="/Gegevens" element={<Gegevens/>}/>
                    <Route path="/Projecten" element={<Projecten/>}/>
                    <Route path="/Colofon" element={<Colofon/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>
            </Routes>
        </div>
    );
}
