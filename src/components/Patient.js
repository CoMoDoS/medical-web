import React from 'react'
import '../css/profile.css'
import axios from 'axios'
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Cookies from 'universal-cookie';
import Medic from "./Medic";
import ReactTable from "react-table";
const cookies = new Cookies();


class Patient extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            status:"",
            type:"",
            name:"",
            bdate:"",
            gender:"",
            address:"",
            medicalRecord:"",
            user_id:"",
            caregiver_id:"",
            medicationPlan : []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {

        let a = cookies.get("usernameID");

        if(a!== undefined && a !== ""){
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:8080/user/patient/byUserId?id=' + a)
                .then(res => {
                    let patient = res.data;
                    if(patient.id != null ){
                        axios.get('http://localhost:8080/medication/getAllByPatientId?id=' + patient.id)
                            .then(res1 => {

                                console.log(res1);
                                let aux1 = {
                                    medicationPlan:res1.data
                                };
                                this.setState(aux1);
                            });
                        let aux ={
                            id: res.data.id,
                            email: res.data.email,
                            status:res.data.status,
                            type:res.data.type,
                            name:res.data.name,
                            bdate:res.data.birthdate,
                            gender:res.data.gender,
                            address:res.data.address,
                            medicalRecord:res.data.medicalRecord,
                            user_id:res.data.user_id,
                            caregiver_id:res.data.caregiver_id
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


        // if(a!== undefined && a !== "") {
        //     let aux ={
        //         id: "1",
        //         email: "email",
        //         status:"statuuus",
        //         type:"",
        //         name:"numeeeelelee",
        //         bdate:"",
        //         gender:"",
        //         address:"",
        //         medicalRecord:"",
        //         user_id:"",
        //         caregiver_id:""
        //     };
        //     this.setState(aux);
        //     document.getElementById("id_name").value = this.state.name;
        //     document.getElementById("id_email").value = this.state.email;
        //     document.getElementById("id_status").value = this.state.status;
        //
        //
        //
        // } else {
        //     this.props.history.push("/login");
        //     // window.location.reload();
        // }

    }

    render() {
        return(
            <div className="container">
                <Form id="form_id">
                    <FormGroup row>
                        <Label for="exampleName" sm={2}>ID</Label>
                        <Col sm={10}>
                            <Input type="text" name="email" id="id_id" placeholder="with a placeholder" defaultValue={this.state.id}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="text" name="email" id="id_email" placeholder="with a placeholder" defaultValue={this.state.email}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleStatus" sm={2}>Status</Label>
                        <Col sm={10}>
                            <Input type="text" name="status" id="id_status" placeholder="password placeholder" defaultValue={this.state.status}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleStatus" sm={2}>Type</Label>
                        <Col sm={10}>
                            <Input type="text" name="status" id="id_type" placeholder="password placeholder" defaultValue={this.state.type}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleStatus" sm={2}>Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="status" id="id_name" placeholder="password placeholder" defaultValue={this.state.name}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleStatus" sm={2}>Birthdate</Label>
                        <Col sm={10}>
                            <Input type="text" name="status" id="id_bdate" placeholder="password placeholder" defaultValue={this.state.bdate}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleStatus" sm={2}>Gender</Label>
                        <Col sm={10}>
                            <Input type="text" name="status" id="id_gender" placeholder="password placeholder" defaultValue={this.state.gender}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleStatus" sm={2}>Address</Label>
                        <Col sm={10}>
                            <Input type="text" name="status" id="id_address" placeholder="password placeholder" defaultValue={this.state.address}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleStatus" sm={2}>Medical Record</Label>
                        <Col sm={10}>
                            <Input type="text" name="status" id="id_medicalRecord" placeholder="password placeholder" defaultValue={this.state.medicalRecord}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleStatus" sm={2}>User id</Label>
                        <Col sm={10}>
                            <Input type="text" name="status" id="id_userid" placeholder="password placeholder" defaultValue={this.state.user_id}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleStatus" sm={2}>Caregiver id</Label>
                        <Col sm={10}>
                            <Input type="text" name="status" id="id_caregiverid" placeholder="password placeholder" defaultValue={this.state.caregiver_id}/>
                        </Col>
                    </FormGroup>
                </Form>

                <div style={{margin:'50px auto', maxWidth:1000, textAlign:'center'}}>

                    <ReactTable
                        // data={this.state.users}
                        data={this.state.medicationPlan}
                        columns={[
                            {
                                Header: "Medication plan",
                                columns: [
                                    {
                                        Header: "treatmentPeriod",
                                        accessor: "treatmentPeriod"
                                    },
                                    {
                                        Header: "intakeIntervals",
                                        accessor: "intakeIntervals"
                                    },
                                    {
                                        Header: "status",
                                        accessor: "status"
                                    },
                                    {
                                        Header: "id_patient",
                                        accessor: "id_patient"
                                    },
                                    {
                                        Header: "id_medication",
                                        accessor: "id_medication"
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
export default Patient;