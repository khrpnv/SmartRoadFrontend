import React from "react";
import Header from "./ui/Header";
import Chart from "../components/ui/Chart"
import * as RoadsService from "../services/RoadsService"
import {Button, Form, Table} from "react-bootstrap";
import Copyright from "./ui/Copyright";
import {Redirect} from "react-router-dom";
import {withTranslation} from "react-i18next";

class RoadsPage extends React.Component {
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
        const {t} = this.props;
        return (
            <div className="contentContainer" style={{width: "1000px", height: "1200px"}}>
                {localStorage.getItem("login") === 'true' ? '' : <Redirect to={"/smart_road/login"}/>}
                <Header switchLanguage={this.switchLanguage}/>
                <h1 style={{textAlign: "center"}}>{t("roadsH")}</h1>
                <div style={{width: "90%", height: "400px"}}>
                    <label style={{textAlign: "center", fontSize: "14px"}}>{t("graphYDesc")}</label>
                    <Chart/>
                    <label style={{textAlign: "center", fontSize: "14px", float: "right"}}>{t("graphXDesc")}</label>
                </div>
                <div style={{width: "100%", height: "50px"}}></div>
                <div style={{width: "100%", height: "580px", margin: "auto"}}>
                    <h1 style={{textAlign: "center"}}>{t("roadsHeader")}</h1>
                    <Table striped bordered hover size="sm" style={{marginTop: "15px"}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{t("tableAddress")}</th>
                            <th>{t("tableDesc")}</th>
                            <th>{t("tableSpeed")}</th>
                            <th>{t("tableLines")}</th>
                            <th>{t("tableLength")}</th>
                            <th>{t("tableBandwidth")}</th>
                            <th>{t("tableState")}</th>
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
                                                    if (this.state.roadState === 'jam') {
                                                        alert(t("jamState"))
                                                    } else {
                                                        alert(t("empty"))
                                                    }
                                                })
                                                .catch(
                                                    error => {
                                                        alert(`Error occurred: ${error}`)
                                                    })}>
                                            {t("tableState")}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
                <Copyright/>
            </div>
        )
    }
}

export default withTranslation()(RoadsPage)