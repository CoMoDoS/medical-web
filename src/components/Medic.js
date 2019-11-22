import React from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from 'axios'
// import StarRatingComponent from 'react-star-rating-component';
// import Popup from 'reactjs-popup'
// import UnitEdit from "./UnitEdit";
// import MedicEdit from "./MedicEdit";
import Cookies from 'universal-cookie';
import Popup from "reactjs-popup";
import PatientEdit from "./PatientEdit";
import CaregiverEdit from "./CaregiverEdit";
import MedicationEdit from "./MedicationEdit";
import PatientMedication from "./PatientMedication";
const cookies = new Cookies();


class Medic extends React.Component{

    constructor() {
        super();
        this.state = {
            patients: [],
            caregivers:[],
            medications:[],
            comments:[]
        };
    }

    componentDidMount() {
        var a = cookies.get("usernameID");
        if ( a != null) {
            axios.defaults.withCredentials = true;
            axios.get('http://localhost:8080/user/caregiver/all' )
                .then(res => {
                    this.setState({caregivers:res.data});
                });
            axios.get('http://localhost:8080/user/patient/all' )
                .then(res => {
                    this.setState({patients:res.data});
                });
            axios.get('http://localhost:8080/medication/all' )
                .then(res => {
                    this.setState({medications:res.data});
                });
            // axios.get('http://localhost:3002/customComments' )
            //     .then(res => {
            //         this.setState({comments:res.data});
            //     });
        } else {
            this.props.history.push("/");
        }
    }
    handleClick(data){
        console.log(data)
    }
    deleteCaregiver(data){
        console.log(data);
        axios({
            method: 'delete',
            url: 'http://localhost:8080/user/caregiver?id='+data.id,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }

    deleteMedication(data){
        console.log(data)
        axios({
            method: 'delete',
            url: 'http://localhost:8080/medication?id='+data.id,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }
    deletePatient(data){
        console.log(data)
        axios({
            method: 'delete',
            url: 'http://localhost:8080/user/patient?id='+data.id,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }

    deleteComment(data){
        console.log(data)
        // axios({
        //     method: 'delete',
        //     url: 'http://localhost:3002/comments/'+data.id,
        //     headers: { 'Content-Type': 'application/json' }
        // }).then((response) => {
        //
        //     console.log(response);
        //     window.location.reload();
        //
        // });
    }
    hideComment(data, value){
        console.log(data)
        // let body = {
        //     hide:value
        // };
        // axios({
        //     method: 'put',
        //     url: 'http://localhost:3002/comments/'+data.id,
        //     data: body,
        //     headers: { 'Content-Type': 'application/json' }
        // }).then((response) => {
        //
        //     console.log(response);
        //     window.location.reload();
        //
        // });
    }


    render(){

        return(
            <div>
                <div style={{margin:'50px auto', maxWidth:1000, textAlign:'center'}}>
                    <Popup
                        trigger={<button className="button"> Create </button>}
                        position="left top"
                        closeOnDocumentClick
                        contentStyle={{ width:420 }}
                    >
                        <PatientEdit id={-1}/>
                    </Popup>
                    <ReactTable
                        // data={this.state.doctors}
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
                                        Header: "birthdate",
                                        accessor: "birthdate"
                                    },
                                    {
                                        Header: "gender",
                                        accessor: "gender"
                                    },
                                    {
                                        Header: "address",
                                        accessor: "address"
                                    },
                                    {
                                        Header: "medicalRecord",
                                        accessor: "medicalRecord"
                                    },
                                    {
                                        Header: "user_id",
                                        accessor: "user_id"
                                    },
                                    {
                                        Header: "caregiver_id",
                                        accessor: "caregiver_id"
                                    },

                                    {
                                        Header:"",
                                        Cell:(row) => {return <button onClick={() => {this.deletePatient(row.original)}}>Delete</button>}
                                    },

                                    {
                                        Header:"",
                                        Cell:(row) => {return <Popup
                                            trigger={<button className="button"> Edit </button>}
                                            position="left top"
                                            closeOnDocumentClick
                                            contentStyle={{ width:420 }}
                                        ><PatientEdit id={row.original.id}/>
                                        </Popup>
                                        }
                                    },
                                    {
                                        Header:"",
                                        Cell:(row) => {return <Popup
                                            trigger={<button className="button"> Add Medication </button>}
                                            position="left top"
                                            closeOnDocumentClick
                                            contentStyle={{ width:800 }}
                                        ><PatientMedication id={row.original.id}/>
                                        </Popup>
                                        }
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
                <div style={{margin:'50px auto', maxWidth:1000, textAlign:'center'}}>
                    <Popup
                        trigger={<button className="button"> Create </button>}
                        position="left top"
                        closeOnDocumentClick
                        contentStyle={{ width:420 }}
                    >
                        <CaregiverEdit id={-1}/>
                    </Popup>
                    <ReactTable
                        // data={this.state.units}
                        data={this.state.caregivers}
                        columns={[
                            {
                                Header: "Caregivers",
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
                                        Header: "status",
                                        accessor: "status"
                                    },
                                    {
                                        Header: "type",
                                        accessor: "type"
                                    },
                                    {
                                        Header: "birthdate",
                                        accessor: "birthdate"
                                    },
                                    {
                                        Header: "gender",
                                        accessor: "gender"
                                    },
                                    {
                                        Header: "address",
                                        accessor: "address"
                                    },
                                    {
                                        Header: "user_id",
                                        accessor: "user_id"
                                    },


                                    {
                                        Header:"",
                                        Cell:(row) => {return <button onClick={() => {this.deleteCaregiver(row.original)}}>Delete</button>}
                                    },
                                    {
                                        Header:"",
                                        Cell:(row) => {return <Popup
                                            trigger={<button className="button"> Edit </button>}
                                            position="left top"
                                            closeOnDocumentClick
                                            contentStyle={{ width:420 }}
                                        ><CaregiverEdit id={row.original.id}/>
                                        </Popup>
                                        }
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
                <div style={{margin:'50px auto', maxWidth:1000, textAlign:'center'}}>
                    <Popup
                        trigger={<button className="button"> Create </button>}
                        position="left top"
                        closeOnDocumentClick
                        contentStyle={{ width:420 }}
                    >
                        <MedicationEdit id={-1}/>
                    </Popup>
                    <ReactTable
                        // data={this.state.users}
                        data={this.state.medications}
                        columns={[
                            {
                                Header: "Medications",
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
                                        Header: "sideEffects",
                                        accessor: "sideEffects"
                                    },
                                    {
                                        Header: "dosage",
                                        accessor: "dosage"
                                    },
                                    {
                                        Header: "Status",
                                        accessor: "status"
                                    },


                                    {
                                        Header:"",
                                        Cell:(row) => {return <button onClick={() => {this.deleteMedication(row.original)}}>Delete</button>}
                                    },
                                    {
                                        Header:"",
                                        Cell:(row) => {return <Popup
                                            trigger={<button className="button"> Edit </button>}
                                            position="left top"
                                            closeOnDocumentClick
                                            contentStyle={{ width:420 }}
                                        ><MedicationEdit id={row.original.id}/>
                                        </Popup>
                                        }
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
        )
    }

}
export default Medic;