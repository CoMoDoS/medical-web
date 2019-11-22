import React from 'react'
import axios from 'axios'
import {Button, Col, Form, FormGroup, FormText, Input, Label} from "reactstrap";

class MedicationPlanEdit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            medications:[]
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:8080/medication/all' )
            .then(res => {
                this.setState({medications:res.data});
            });
    }

    handleCreate = () => {
        let e = document.getElementById("id_medication");
        let medId = e.options[e.selectedIndex].value;

        let data = {
            id : document.getElementById("id_id").value,
            treatmentPeriod : document.getElementById("id_treatmentPeriod").value,
            intakeIntervals : document.getElementById("id_intakeIntervals").value,
            id_medication : medId,
            status : document.getElementById("id_status").value,
            id_patient : this.props.id
        };
        // axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: 'http://localhost:8080/medication/medplan',
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
                    <Label for="exampleName" sm={2}>ID patient</Label>
                    <Col sm={10}>
                        <Input type="text" name="email" id="id_id" placeholder="with a placeholder" defaultValue={this.props.id}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleName" sm={2}>treatmentPeriod</Label>
                    <Col sm={10}>
                        <Input type="text" name="email" id="id_treatmentPeriod" placeholder="with a placeholder"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleName" sm={2}>intakeIntervals</Label>
                    <Col sm={10}>
                        <Input type="text" name="email" id="id_intakeIntervals" placeholder="with a placeholder"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleName" sm={2}>status</Label>
                    <Col sm={10}>
                        <Input type="text" name="email" id="id_status" placeholder="with a placeholder" />
                    </Col>
                </FormGroup>

                {/*<FormGroup row>*/}
                {/*    <Label for="exampleName" sm={2}>Id medication</Label>*/}
                {/*    <Col sm={10}>*/}
                {/*        <Input type="text" name="email" id="id_medication" placeholder="with a placeholder" />*/}
                {/*    </Col>*/}
                {/*</FormGroup>*/}

                <FormGroup row>
                    <Label for="exampleSelect" sm={2}>Medication</Label>
                    <Col sm={10}>
                        <Input type="select" name="medication" id="id_medication" >

                            {this.state.medications.map( m => {
                                return  <option value={m.id}>{m.name}</option>
                            })
                            }


                        </Input>
                    </Col>
                </FormGroup>




                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                        <Button onClick={() => this.handleCreate()}>Submit</Button>
                    </Col>
                </FormGroup>
                <div id="id_eroare"/>
            </Form>
        )
    }
}
export default MedicationPlanEdit;