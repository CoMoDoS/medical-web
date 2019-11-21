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
        <Route exact path="/profile" render={props => <Profile {...props} />}/>
        <Route path="/medic" component={props => <Medic {...props}/>}/>
        {/*<Route exact path="/IncasariBTDClient/uploadRaport" render={props => <UploadRaport {...props} />}/>*/}
        {/*<Route exact path="/IncasariBTDClient/uploadDosare" render={props => <UploadDosare {...props} />}/>*/}
        {/*<Route exact path="/IncasariBTDClient/searchOptions/:id" render={props => <SearchOptions {...props} />}/>*/}
        {/*<Route exact path="/IncasariBTDClient/rapoarte" render={props => <Rapoarte {...props} />}/>*/}
      </Router>
  );
}

export default App;