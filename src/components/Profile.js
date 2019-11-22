import React from 'react'
import '../css/profile.css'
import axios from 'axios'
import Cookies from 'universal-cookie';
import Medic from "./Medic";
import Patient from "./Patient";
import Caregiver from "./Caregiver";
const cookies = new Cookies();


class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            type:"",
            status:"",
        };
        this.componentDidMount = this.componentDidMount.bind(this);

    }


    componentDidMount() {
        let a = cookies.get("usernameID");
        if(a!== undefined && a !== ""){
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:8080/user?id=' + a)
                .then(res => {
                    console.log(res);
                    let aux = {
                        id: res.data.id,
                        email: res.data.email,
                        type: res.data.type,
                        status: res.data.status
                    };
                    this.setState(aux);
                });
        }
        else {
            this.props.history.push("/login");
            // window.location.reload();
        }
    }

    render() {
        return(
            <div className="container">
                {this.state.type == "MEDIC" ? <Medic {...this.props}/> : <div></div>}
                {this.state.type == "PATIENT" ? <Patient {...this.props}/> : <div></div>}
                {this.state.type == "CAREGIVER" ? <Caregiver {...this.props}/> : <div></div>}
            </div>
        );
    }

}
export default Profile;
