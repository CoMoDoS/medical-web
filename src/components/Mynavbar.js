
import React from 'react';
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// import '../css/navbar.css'


class MyNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location:"",
            name: this.getName()
        }
    }
    getActive = (loc) => {
        this.setState({
            location:loc,
            name:this.getName()
        })
    };
    getName = () => {
        let cookieName = cookies.get("type");
        if ( cookieName.length !== 0 ){
            return cookieName;
        } else {
            return ''
        }

    };
    render() {
        return(
            <nav className="navbar  navbar-expand-sm  navbar-dark bg-dark" >
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">

                        <li className= {this.state.location === "home" ? "nav-item active" : "nav-item"}>
                            <Link onClick={() => {this.getActive("home")}}  to={'/'} className="nav-link"> Home</Link><span className="sr-only">(current)</span>
                        </li>
                        {/*<li className={this.state.location === "uploadRaport" ? "nav-item active" : "nav-item"}>*/}
                        {/*<Link onClick={() => {this.getActive("uploadRaport")}}  to={'/Medical/uploadRaport'} className="nav-link"> Upload raport</Link><span className="sr-only">(current)</span>*/}
                        {/*</li>*/}
                        {/*<li className={this.state.location === "uploadDosare" ? "nav-item active" : "nav-item"}>*/}
                        {/*<Link onClick={() => {this.getActive("uploadDosare")}}  to={'/Medical/uploadDosare'}  className="nav-link"> Upload dosare </Link><span className="sr-only">(current)</span>*/}
                        {/*</li>*/}
                        {/*<li className={this.state.location === "rapoarte" ? "nav-item active" : "nav-item"}>*/}
                        {/*<Link onClick={() => {this.getActive("rapoarte")}}  to={'/Medical/rapoarte'}  className="nav-link"> Rapoarte </Link><span className="sr-only">(current)</span>*/}
                        {/*</li>*/}
                    </ul>
                    <div id="loginName">{this.state.name !== '' ?  this.state.name : "" }</div>
                </div>
            </nav>
        )
    }
}
export default MyNavbar;
