import React from 'react';
import './App.css';
import {Route,BrowserRouter as  Router} from "react-router-dom";
import MyNavbar from "./components/Mynavbar";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Medic from "./components/Medic";

function App() {




    return (
        <Router>
            <MyNavbar />
            <Route exact path="/login" render={props => <Login {...props} />}/>
            <Route exact path="/" render={props => <Profile {...props} />}/>
            <Route exact path="/medic" component={props => <Medic {...props}/>}/>
        </Router>
    );
}

export default App;