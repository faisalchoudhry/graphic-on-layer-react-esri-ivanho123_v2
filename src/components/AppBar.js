import * as React from 'react';
import ReactDOM from 'react-dom'
import {Route, Routes, BrowserRouter, Link, Outlet, NavLink} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ErrorPage from "./ErrorPage";
import Gegevens from "./Gegevens";
import Projecten from "./Projecten";
import Colofon from "./Colofon";
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
                            {/*< BrowserRouter>*/}
                                <NavLink className="navlinkCss" className={({ isActive }) =>
                                    (isActive ? "active-class" : "not-active-class")} size="large" component={Link} color="inherit" to="/">Main</NavLink>
                                <NavLink className="navlinkCss" className={({ isActive }) =>
                                    (isActive ? "active-class" : "not-active-class")} size="large" component={Link} color="inherit" to="/Gegevens">Gegevens</NavLink>
                                <NavLink className="navlinkCss" className={({ isActive }) =>
                                    (isActive ? "active-class" : "not-active-class")} size="large" component={Link} color="inherit" to="/Projecten">Projecten</NavLink>
                                <NavLink className="navlinkCss" className={({ isActive }) =>
                                    (isActive ? "active-class" : "not-active-class")} size="large" component={Link} color="inherit" to="/Colofon">Colofon</NavLink>
                                {/*<Routes>*/}
                                {/*    <Route path="/" element={<Layout/>}>*/}
                                {/*        <Route index path="/" element={<Maps/>}/>*/}
                                {/*        <Route path="/Gegevens" element={<Gegevens/>}/>*/}
                                {/*        <Route path="/Projecten" element={<Projecten/>}/>*/}
                                {/*        <Route path="/Colofon" element={<Colofon/>}/>*/}
                                {/*    </Route>*/}
                                {/*</Routes>*/}

                            {/*</BrowserRouter>*/}
                        </Toolbar>
                    </AppBar>
                </Box>

                {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
                {/*<Outlet/>*/}
                {/*<hr />*/}

                <Outlet />
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
                    <Route path="*" element={<ErrorPage/>} />
                </Route>
            </Routes>
        </div>
    );
}
