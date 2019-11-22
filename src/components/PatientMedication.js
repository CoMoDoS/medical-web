import React from 'react'
import '../css/profile.css'
import axios from 'axios'
import Cookies from 'universal-cookie';
import ReactTable from "react-table";
import Popup from "reactjs-popup";
import MedicationPlanEdit from "./MedicationPlanEdit";
const cookies = new Cookies();


class PatientMedication extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            medicationPlan : []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        if ( this.props.id > 0) {
            axios.get('http://localhost:8080/medication/getAllByPatientId?id=' + this.props.id)
                .then(res1 => {

                    console.log(res1);
                    let aux1 = {
                        medicationPlan:res1.data
                    };
                    this.setState(aux1);
                });
        }else{
        }
    }

    render() {
        return(
            <div className="container">

                <div style={{margin:'50px auto', maxWidth:1000, textAlign:'center'}}>
                    <Popup
                        trigger={<button className="button"> Create </button>}
                        position="left top"
                        closeOnDocumentClick
                        contentStyle={{ width:600 }}
                    >
                        <MedicationPlanEdit id={this.props.id}/>
                    </Popup>
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
export default PatientMedication;