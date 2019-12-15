import React from "react";
import Header from "./ui/Header";
import Chart from "../components/ui/Chart"
import * as RoadsService from "../services/RoadsService"
import {Button, Form, Table} from "react-bootstrap";
import Copyright from "./ui/Copyright";
import {Redirect} from "react-router-dom";

export default class RoadsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roads: [],
            roadState: ""
        };
    }

    componentDidMount() {
        RoadsService.getAll().then(res => this.setState({...this.state, roads: res}))
    }

    render() {
        return (
            <div className="contentContainer" style={{width: "1000px", height: "1200px"}}>
                {localStorage.getItem("login") === 'true' ? '' : <Redirect to={"/smart_road/login"}/>}
                <Header/>
                <h1 style={{textAlign: "center"}}>Traffic jam statistics</h1>
                <div style={{width: "90%", height: "400px"}}>
                    <label style={{textAlign: "center", fontSize: "14px"}}>Amount of cars on road</label>
                    <Chart/>
                    <label style={{textAlign: "center", fontSize: "14px", float: "right"}}>Time</label>
                </div>
                <div style={{width: "100%", height: "50px"}}></div>
                <div style={{width: "100%", height: "580px", margin: "auto"}}>
                    <h1 style={{textAlign: "center"}}>Roads</h1>
                    <Table striped bordered hover size="sm" style={{marginTop: "15px"}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Address</th>
                            <th>Description</th>
                            <th>Max allowed speed</th>
                            <th>Amount of lines</th>
                            <th>Length (km)</th>
                            <th>Bandwidth (per hour)</th>
                            <th>State</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.roads.map((road, index) => (
                                <tr>
                                    <td>{index}</td>
                                    <td>{road.address}</td>
                                    <td>{road.description}</td>
                                    <td>{road.maxAllowedSpeed}</td>
                                    <td>{road.amountOfLines}</td>
                                    <td>{road.length}</td>
                                    <td>{road.bandwidth}</td>
                                    <td>
                                        <Button variant="primary" onClick={() =>
                                            RoadsService.getType(road.id)
                                                .then(res => {
                                                    this.setState({...this.state, roadState: res});
                                                    alert(this.state.roadState);
                                                })
                                                .catch(
                                                    error => {
                                                        alert(`Error occurred: ${error}`)
                                                    })}>
                                            State
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
                <Copyright />
            </div>
        )
    }
}