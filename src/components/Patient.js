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
            password:"",
            type:"",
            name:"",
            problem:"",
            image:""
        };
        this.componentDidMount = this.componentDidMount.bind(this);

    }


    componentDidMount() {

        let a = cookies.get("usernameID");
        debugger;
        if(a!== undefined && a !== ""){
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:8080/user/patient?id=' + a)
                .then(res => {

                    console.log(res);
                    let aux = {
                        id: res.data.id,
                        email: res.data.email,
                        type: res.data.type
                    };
                    this.setState(aux);
                    // document.getElementById("id_email").value = this.state.email;
                    // document.getElementById("id_name").value = this.state.type;
                    // document.getElementById("id_password").value = this.state.status;
                });
        }
        else {
            this.props.history.push("/login");
            window.location.reload();
        }


        // if ( a != null) {
        //     axios.defaults.withCredentials = true;
        //     axios.get('http://localhost/php/getUserById.php')
        //         .then(res => {
        //
        //             console.log(res);
        //             var aux = {
        //                 id: res.data[0].id,
        //                 email: res.data[0].email,
        //                 password: res.data[0].password,
        //                 type: res.data[0].type,
        //                 name: res.data[0].name,
        //                 problem: res.data[0].problem,
        //                 image: res.data[0].image
        //             };
        //             this.setState(aux);
        //             document.getElementById("id_email").value = this.state.email;
        //             document.getElementById("id_name").value = this.state.name;
        //             document.getElementById("id_password").value = this.state.password;
        //         });
        // } else {
        //     this.props.history.push("/login");
        // }
    }

    handleSubmit = () => {


        var email = document.getElementById("id_email").value;
        var name = document.getElementById("id_name").value;
        var password = document.getElementById("id_password").value;
        var problem = document.getElementById("id_problem").value;
        var image = document.querySelector('[type=file]').files[0]; //document.getElementById("id_image").value;





        var bodyFormData = new FormData();
        bodyFormData.set('email', email);
        bodyFormData.set('name', name);
        bodyFormData.set('password', password);
        bodyFormData.set('problem', problem);
        bodyFormData.append('image', image);
        axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            url: 'http://localhost/php/updateUser.php',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
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
        return(
            <div className="container">

                <div className="fb-profile">
                    <img align="left" className="fb-image-lg" src="/images/banner-bg.jpg"
                         alt="Profile example"/>
                    <img align="left" className="fb-image-profile thumbnail"
                         src={this.state.image} alt="Profile example" style={{height: '140px', width: '170px', borderRadius: '46px'}}/>
                    <div className="fb-profile-text">
                        <h1>{this.state.name}</h1>

                    </div>
                </div>
                <Form id="form_id" action="http://localhost/php/updateUser.php" method="POST">
                    <FormGroup row>
                        <Label for="exampleName" sm={2}>Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="email" id="id_name" placeholder="with a placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleEmail" sm={2}>Email</Label>
                        <Col sm={10}>
                            <Input type="text" name="email" id="id_email" placeholder="with a placeholder"/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="examplePassword" sm={2}>Password</Label>
                        <Col sm={10}>
                            <Input type="password" name="password" id="id_password" placeholder="password placeholder" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="exampleSelect" sm={2}>Problem</Label>
                        <Col sm={10}>
                            <Input type="select" name="select" id="id_problem" >
                                <option>{this.state.problem}</option>
                                <option>Inima</option>
                                <option>Maini</option>
                                <option>Stomac</option>
                                <option>Picioare</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="exampleFile" sm={2}>Image</Label>
                        <Col sm={10}>
                            <Input type="file" name="image" id="id_image" />
                            <FormText color="muted">
                                Chose an image.
                            </FormText>
                        </Col>
                    </FormGroup>

                    <FormGroup check row>
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button onClick={() => this.handleSubmit()}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>

                <div style={{margin:'50px auto', maxWidth:1000, textAlign:'center'}}>

                    <ReactTable
                        // data={this.state.users}
                        data={[
                            {
                                "email":"ema1",
                                "problem":"problem1",
                                "admin":"admin1"
                            },
                            {
                                "email":"ema2",
                                "problem":"problem2",
                                "admin":"admin2"
                            },
                            {
                                "email":"ema3",
                                "problem":"problem3",
                                "admin":"admin3"
                            }
                        ]}
                        columns={[
                            {
                                Header: "Medications",
                                columns: [
                                    // {
                                    //     Header: "Profile",
                                    //     Cell: (row) => {
                                    //         return <div><img height={50} src={row.original.user_detail.image} alt="profile"/></div>
                                    //     },
                                    //     id: "status"
                                    //
                                    // },
                                    {
                                        Header: "Emai",
                                        accessor: "email"
                                    },
                                    // {
                                    //     Header: "Name",
                                    //     accessor: d => d.user_detail.name,
                                    //     id: "name"
                                    //
                                    // },
                                    {
                                        Header: "Problem",
                                        accessor: "problem"


                                    },
                                    {
                                        Header: "Admin",
                                        accessor: "admin"
                                    },
                                    {
                                        Header:"",
                                        Cell:(row) => {return <button onClick={() => {this.deleteUser(row.original)}}>Delete</button>}
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