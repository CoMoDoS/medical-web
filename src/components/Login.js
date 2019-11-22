import React from "react";
import '../css/login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Login extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleLogin = (username, password) => {
        let bodyFormData = new FormData();
        bodyFormData.set('email', username);
        bodyFormData.set('password', password);
        axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: 'http://localhost:8080/login',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then((response) => {

            console.log(response);
            if(response.status === 200){
                cookies.set("usernameID",response.data.id);
                cookies.set("type", response.data.type);
                this.props.history.push("/");
                // window.location.reload();
            }
        });
/*
        cookies.set("usernameID",username);
        cookies.set("type", password);
        this.props.history.push("/");*/

        // cookies.set("username",username);
        // cookies.set("type", password);
        // this.props.history.push("/profile");
        // window.location.reload();

    };
    render(){
        return(<div style={{background:"url('/images/bg.jpg')", height:920}}>
                <div className="wrapper fadeInDown" backgroundimage="/images/banner-bg.jpg">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src="/images/login.png" id="icon" alt="User Icon"/>
                        </div>
                        <div>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="username" value={this.state.login} onChange = {this.handleChange}/>
                            <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" value={this.state.password} onChange = {this.handleChange}/>
                            <button className="fadeIn fourth" onClick={() => this.handleLogin(this.state.login, this.state.password)}> Log In </button>
                        </div>
                        <div id="formFooter">
                            <button className="underlineHover" >Forgot Password?</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Login;