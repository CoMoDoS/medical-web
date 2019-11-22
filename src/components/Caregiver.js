import React from 'react'
import '../css/profile.css'
import axios from 'axios'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Cookies from 'universal-cookie';
import Medic from "./Medic";
import ReactTable from "react-table";
const cookies = new Cookies();


class Caregiver extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            patients:[],
            id:0
        };
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    componentDidMount() {
        //http://localhost:8080/user/patient/byCaregiver?id=1
        ///caregiver/byUserId
        let a = cookies.get("usernameID");

        if(a!== undefined && a !== ""){
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:8080/user/caregiver/byUserId?id=' + a)
                .then(res => {
                    let caregiver = res.data;
                    if(caregiver.id != null ){
                        axios.get('http://localhost:8080/user/patient/byCaregiver?id=' + caregiver.id)
                            .then(res1 => {

                                console.log(res1);
                                let aux1 = {
                                    patients:res1.data
                                };
                                this.setState(aux1);
                            });
                        let aux ={
                            id: res.data.id,
                        };
                        this.setState(aux);
                    }
                    console.log(res);
                });
        }
        else {
            this.props.history.push("/login");
            window.location.reload();
        }



    }
    render() {
        return(
            <div className="container">

                <div style={{margin:'50px auto', maxWidth:1000, textAlign:'center'}}>
                    <ReactTable
                        // data={this.state.units}
                        data={this.state.patients}
                        columns={[
                            {
                                Header: "Patients",
                                columns: [
                                    {
                                        Header: "Id",
                                        accessor: "id"
                                    },
                                    {
                                        Header: "Name",
                                        accessor: "name"
                                    },
                                    {
                                        Header: "Email",
                                        accessor: "email"
                                    },
                                    {
                                        Header: "Status",
                                        accessor: "status"
                                    },
                                    {
                                        Header: "Type",
                                        accessor: "type"
                                    },
                                    {
                                        Header: "Birthdate",
                                        accessor: "birthdate"
                                    },
                                    {
                                        Header: "Gender",
                                        accessor: "gender"
                                    },
                                    {
                                        Header: "Address",
                                        accessor: "address"
                                    },
                                    {
                                        Header: "User id",
                                        accessor: "user_id"
                                    }
                                ]
                            }
                        ]}
                        defaultSorted={[
                            {
                                id: "name",
                                desc: true
                            }
                        ]}
                        defaultPageSize={5}
                        className="-highlight"
                    />
                </div>
            </div>
        );
    }

}
export default Caregiver;