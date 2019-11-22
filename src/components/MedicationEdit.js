import React from 'react'
import axios from 'axios'
import {Button, Col, Form, FormGroup, FormText, Input, Label} from "reactstrap";

class MedicationEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: "",
            name:"",
            sideEffects:"",
            dosage:"",
            status:""
        };
    }
    componentDidMount() {
        if ( this.props.id > 0) {
            axios.get('http://localhost:8080/medication?id=' + this.props.id)
                .then(res => {
                    this.setState(res.data);
                });
        }else{
        }
    }

    handleSubmit = () => {
        let data = {
            id : document.getElementById("id_id").value,
            name : document.getElementById("id_name").value,
            sideEffects : document.getElementById("id_sideEffects").value,
            dosage : document.getElementById("id_dosage").value,
            status : document.getElementById("id_status").value
        };
        // axios.defaults.withCredentials = true;
        axios({
            method: 'put',
            url: 'http://localhost:8080/medication/update?id=' + this.props.id,
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
            id : document.getElementById("id_id").value,
            name : document.getElementById("id_name").value,
            sideEffects : document.getElementById("id_sideEffects").value,
            dosage : document.getElementById("id_dosage").value,
            status : document.getElementById("id_status").value
        };
        // axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: 'http://localhost:8080/medication/new',
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
                    <Label for="exampleStatus" sm={2}>Status</Label>
                    <Col sm={10}>
                        <Input type="text" name="status" id="id_status" placeholder="password placeholder" defaultValue={this.state.status}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleStatus" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input type="text" name="status" id="id_name" placeholder="password placeholder" defaultValue={this.state.name}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="exampleStatus" sm={2}>Side effect</Label>
                    <Col sm={10}>
                        <Input type="text" name="status" id="id_sideEffects" placeholder="password placeholder" defaultValue={this.state.bdate}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleStatus" sm={2}>Dosage</Label>
                    <Col sm={10}>
                        <Input type="text" name="status" id="id_dosage" placeholder="password placeholder" defaultValue={this.state.gender}/>
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
export default MedicationEdit;