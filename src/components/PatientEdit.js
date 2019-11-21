import React from 'react'
import axios from 'axios'
import {Button, Col, Form, FormGroup, FormText, Input, Label} from "reactstrap";

class PatientEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount() {
        if ( this.props.id > 0) {
            axios.get('http://localhost:3002/doctors/' + this.props.id)
                .then(res => {
                    debugger;
                    this.setState({data: res.data});
                    document.getElementById("id_name").value = this.state.data.name;
                    // document.getElementById("id_password").value = this.state.data.location;
                    document.getElementById("id_year").value = this.state.data.year;
                    document.getElementById("id_spec").value = this.state.data.speciality;


                });
        }else{
            document.getElementById("id_name").value = "";
            // document.getElementById("id_password").value = this.state.data.location;
            document.getElementById("id_year").value = "";
            document.getElementById("id_spec").value = "";
        }
    }

    handleSubmit = () => {


        var year = document.getElementById("id_year").value;
        var name = document.getElementById("id_name").value;
        var speciality = document.getElementById("id_spec").value;
        // var problem = document.getElementById("id_problem").value;
        // var image = document.querySelector('[type=file]').files[0]; //document.getElementById("id_image").value;





        var bodyFormData = new FormData();
        bodyFormData.set('year', year);
        bodyFormData.set('name', name);
        bodyFormData.set('speciality', speciality);
        // bodyFormData.set('problem', problem);
        // bodyFormData.append('image', image);

        debugger;
        console.log(bodyFormData);

        // axios.defaults.withCredentials = true;
        axios({
            method: 'put',
            url: 'http://localhost:3002/doctors/' + this.props.id,
            data: bodyFormData,

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


        var year = document.getElementById("id_year").value;
        var name = document.getElementById("id_name").value;
        var speciality = document.getElementById("id_spec").value;
        // var problem = document.getElementById("id_problem").value;
        // var image = document.querySelector('[type=file]').files[0]; //document.getElementById("id_image").value;





        var bodyFormData = new FormData();
        bodyFormData.set('year', year);
        bodyFormData.set('name', name);
        bodyFormData.set('speciality', speciality);
        // bodyFormData.set('problem', problem);
        // bodyFormData.append('image', image);

        debugger;
        console.log(bodyFormData);

        // axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: 'http://localhost:3002/doctors',
            data: bodyFormData,

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
                    <Label for="exampleName" sm={2}>Name</Label>
                    <Col sm={10}>
                        <Input type="text" name="name" id="id_name" placeholder="with a placeholder"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>Year</Label>
                    <Col sm={10}>
                        <Input type="text" name="year" id="id_year" placeholder="with a placeholder"/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="exampleSelect" sm={2}>Speciality</Label>
                    <Col sm={10}>
                        <Input type="select" name="spec" id="id_spec" >
                            <option value="initial"></option>
                            <option>Cardiolog</option>
                            <option>Ortoped</option>
                            <option>Pediatru</option>
                            <option>Oftalmolog</option>

                        </Input>
                    </Col>
                </FormGroup>
                {/*<FormGroup row>*/}
                {/*    <Label for="exampleFile" sm={2}>Image</Label>*/}
                {/*    <Col sm={10}>*/}
                {/*        <Input type="file" name="image" id="id_image" />*/}
                {/*    </Col>*/}
                {/*</FormGroup>*/}
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
export default PatientEdit;