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
            patients:[]
        };
        this.componentDidMount = this.componentDidMount.bind(this);

    }
    componentDidMount() {
        let a = cookies.get("usernameID");
        if(a!== undefined && a !== ""){


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
                        data={[
                            {
                                "email":"Doctor1",
                                "name":"name1",
                                "status":"2019"
                            },
                            {
                                "email":"Doctor1",
                                "name":"name1",
                                "status":"2019"
                            },
                            {
                                "email":"Doctor1",
                                "name":"name1",
                                "status":"2019"
                            }
                        ]}
                        columns={[
                            {
                                Header: "Patients",
                                columns: [
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