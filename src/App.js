import React from 'react';
import './App.css';

import MainPage from "./components/MainPage";
import DriverPage from "./components/DriverPage";
import OwnerPage from "./components/OwnerPage";
import LoginPage from "./components/LoginPage";

import {BrowserRouter, Route} from "react-router-dom";
import RoadsPage from "./components/RoadsPage";


function App() {
    document.title = "SmartRoad";
    return (
        <BrowserRouter>
            <div>
                <Route path={["/", "/smart_road/login"]} exact component={LoginPage}/>
                <Route path="/smart_road/main" exact component={MainPage}/>
                <Route path="/smart_road/driver" exact component={DriverPage}/>
                <Route path="/smart_road/owner" exact component={OwnerPage}/>
                <Route path="/smart_road/roads" exact component={RoadsPage}/>
            </div>
        </BrowserRouter>
    );
}

export default App;

