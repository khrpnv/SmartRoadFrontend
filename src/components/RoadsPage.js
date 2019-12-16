import React from "react";
import Header from "./ui/Header";
import Chart from "../components/ui/Chart"
import * as RoadsService from "../services/RoadsService"
import {Button, Form, Table} from "react-bootstrap";
import Copyright from "./ui/Copyright";
import {Redirect} from "react-router-dom";
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        header: "Traffic jam statistics",
        graphYDesc: "Amount of cars on road",
        graphXDesc: "Time",
        roadsHeader: "Roads",
        tableAddress: "Address",
        tableDesc: "Description",
        tableSpeed: "Max allowed speed",
        tableLines: "Amount of lines",
        tableLength: "Length (km)",
        tableBandwidth: "Bandwidth (per hour)",
        tableState: "State"
    },
    ua: {
        header: "Статистика заторів",
        graphYDesc: "Кількість авто",
        graphXDesc: "Час",
        roadsHeader: "Дороги",
        tableAddress: "Адресса",
        tableDesc: "Опис",
        tableSpeed: "Максимальна швидкість",
        tableLines: "Кількість полос",
        tableLength: "Довжина (км)",
        tableBandwidth: "Пропускна здатність (за годину)",
        tableState: "Стан"
    }
});

export default class RoadsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roads: [],
            roadState: ""
        };

        this.switchLanguage = this.switchLanguage.bind(this);
    }

    componentDidMount() {
        RoadsService.getAll().then(res => this.setState({...this.state, roads: res}))
    }

    switchLanguage() {
        let currentLanguage = localStorage.getItem("language");
        if (currentLanguage === 'en') {
            strings.setLanguage('ua');
        } else {
            strings.setLanguage('en');
        }
        localStorage.setItem("language", strings.getLanguage());
        this.setState({...this.state});
    }

    render() {
        strings.setLanguage(localStorage.getItem("language"));
        return (
            <div className="contentContainer" style={{width: "1000px", height: "1200px"}}>
                {localStorage.getItem("login") === 'true' ? '' : <Redirect to={"/smart_road/login"}/>}
                <Header switchLanguage={this.switchLanguage}/>
                <h1 style={{textAlign: "center"}}>{strings.header}</h1>
                <div style={{width: "90%", height: "400px"}}>
                    <label style={{textAlign: "center", fontSize: "14px"}}>{strings.graphYDesc}</label>
                    <Chart/>
                    <label style={{textAlign: "center", fontSize: "14px", float: "right"}}>{strings.graphXDesc}</label>
                </div>
                <div style={{width: "100%", height: "50px"}}></div>
                <div style={{width: "100%", height: "580px", margin: "auto"}}>
                    <h1 style={{textAlign: "center"}}>{strings.roadsHeader}</h1>
                    <Table striped bordered hover size="sm" style={{marginTop: "15px"}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{strings.tableAddress}</th>
                            <th>{strings.tableDesc}</th>
                            <th>{strings.tableSpeed}</th>
                            <th>{strings.tableLines}</th>
                            <th>{strings.tableLength}</th>
                            <th>{strings.tableBandwidth}</th>
                            <th>{strings.tableState}</th>
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
                                            {strings.tableState}
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