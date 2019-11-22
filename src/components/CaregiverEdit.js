import React from 'react'
import axios from 'axios'
import {Button, Col, Form, FormGroup, FormText, Input, Label} from "reactstrap";

class CaregiverEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: "",
            email: "",
            password:"",
            status:"",
            type:"",
            name:"",
            bdate:"",
            gender:"",
            address:"",
            user_id:""
        };
    }
    componentDidMount() {
        if ( this.props.id > 0) {
            axios.get('http://localhost:8080/user/caregiver?id=' + this.props.id)
                .then(res => {
                    let patient = res.data;
                    let aux ={
                        id: patient.id,
                        email: patient.email,
                        password : patient.password,
                        status:patient.status,
                        type:patient.type,
                        name:patient.name,
                        bdate:patient.birthdate,
                        gender:patient.gender,
                        address:patient.address,
                        user_id:patient.user_id
                    };
                    this.setState(aux);
                });
        }else{
        }
    }

    handleSubmit = () => {
        let data = {
            id : document.getElementById("id_id").value,
            email : document.getElementById("id_email").value,
            status : document.getElementById("id_status").value,
            type : document.getElementById("id_type").value,
            name : document.getElementById("id_name").value,
            birthdate : document.getElementById("id_bdate").value,
            gender : document.getElementById("id_gender").value,
            address : document.getElementById("id_address").value,
            user_id : document.getElementById("id_userid").value,
            password :  document.getElementById("id_password").value
        };
        // axios.defaults.withCredentials = true;
        axios({
            method: 'put',
            url: 'http://localhost:8080/user/caregiver?id=' + this.props.id,
            data: data,

        })
            .then(function (response) {
                //handle success
                console.log(response);
                window.location.reload();
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    handleCreate = () => {


        let data = {
            // id : document.getElementById("id_id").value,
            email : document.getElementById("id_email").value,
            status : document.getElementById("id_status").value,
            type : document.getElementById("id_type").value,
            name : document.getElementById("id_name").value,
            birthdate : document.getElementById("id_bdate").value,
            gender : document.getElementById("id_gender").value,
            address : document.getElementById("id_address").value,
            user_id : document.getElementById("id_userid").value,
            password :  document.getElementById("id_password").value
        };
        // axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: 'http://localhost:8080/user/caregiver',
            data: data,

        })
            .then(function (response) {
                //handle success
                console.log(response);
                window.location.reload();
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    render() {
        return(<Form style={{margin:'50px auto', minWidth:410, maxWidth:1000, textAlign:'center'}}>
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
                    <Label for="exampleEmail" sm={2}>Password</Label>
                    <Col sm={10}>
                        <Input type="password" name="password" id="id_password" placeholder="with a placeholder" defaultValue={this.state.password}/>
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
                    <Label for="exampleStatus" sm={2}>User id</Label>
                    <Col sm={10}>
                        <Input type="text" name="status" id="id_userid" placeholder="password placeholder" defaultValue={this.state.user_id}/>
                    </Col>
                </FormGroup>

                {this.props.id > 0 ? <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button onClick={() => this.handleSubmit()}>Submit</Button>
                        </Col>
                    </FormGroup> :
                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button onClick={() => this.handleCreate()}>Submit</Button>
                        </Col>
                    </FormGroup>}
                <div id="id_eroare"/>
            </Form>
        )
    }
}
export default CaregiverEdit;