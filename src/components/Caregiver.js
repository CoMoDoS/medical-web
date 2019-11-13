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

        let a = cookies.get("username");
        debugger;
        if(a!== undefined && a !== ""){
            let type = cookies.get("type");
            if(type!== undefined && type !== ""){
                this.setState({
                    type:type
                })
            }
            this.setState({
                name:a
            })
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
                    {/*<Popup*/}
                    {/*trigger={<button className="button"> Create </button>}*/}
                    {/*position="left top"*/}
                    {/*closeOnDocumentClick*/}
                    {/*contentStyle={{ width:420 }}*/}
                    {/*>*/}
                    {/*<UnitEdit id={-1}/>*/}
                    {/*</Popup>*/}
                    <ReactTable
                        // data={this.state.units}
                        data={[
                            {
                                "Profile":"Doctor1",
                                "name":"name1",
                                "speciality":"2019"
                            },
                            {
                                "Profile":"Doctor1",
                                "name":"name1",
                                "speciality":"2019"
                            },
                            {
                                "Profile":"Doctor1",
                                "name":"name1",
                                "speciality":"2019"
                            }
                        ]}
                        columns={[
                            {
                                Header: "Patients",
                                columns: [
                                    {
                                        Header: "Profile",
                                        Cell: (row) => {
                                            return <div><img height={50} src={row.original.image} alt="profile"/></div>
                                        },
                                        id: "status"
                                    },
                                    {
                                        Header: "Name",
                                        accessor: "name"
                                    },
                                    {
                                        Header: "Speciality",
                                        accessor: "speciality"
                                    },
                                    {
                                        Header:"",
                                        Cell:(row) => {return <button onClick={() => {this.deleteUnits(row.original)}}>Delete</button>}
                                    },
                                    // {
                                    //     Header:"",
                                    //     Cell:(row) => {return <Popup
                                    //         trigger={<button className="button"> Edit </button>}
                                    //         position="left top"
                                    //         closeOnDocumentClick
                                    //         contentStyle={{ width:420 }}
                                    //     ><UnitEdit id={row.original.id}/>
                                    //     </Popup>
                                    //     }
                                    // }

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