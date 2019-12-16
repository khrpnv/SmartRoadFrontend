import React from "react";
import Header from "./ui/Header";
import * as ServiceStationsService from "../services/ServiceStationsService"
import {Button, Form, Table} from "react-bootstrap";
import ServiceTypesDropDown from "./ui/ServiceTypesDropDown";
import {Redirect} from "react-router-dom";
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        getLoc: "Getting your current location...",
        geoError: "Geolocation is not supported by this browser.",
        submit: "Submit",
        serviceType: "Service type",
        tableName: "Name",
        tableDesc: "Description",
        tableCoords: "Location"
    },
    ua: {
        getLoc: "Отримання Ваших поточних координат...",
        geoError: "Геолокація недоступна в цьому браузері.",
        submit: "Підтвердити",
        serviceType: "Тип сервісу",
        tableName: "Ім'я",
        tableDesc: "Опис",
        tableCoords: "Місцезнаходження"
    }
});

export default class DriverPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            serviceStations: [],
            long: 0,
            isLoading: true,
            searchTypeId: -1,
            title: strings.serviceType
        };

        this.coords = this.coords.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.setSearchTypeId = this.setSearchTypeId.bind(this);
        this.switchLanguage = this.switchLanguage.bind(this);
    }

    switchLanguage() {
        let currentLanguage = localStorage.getItem("language");
        if (currentLanguage === 'en') {
            strings.setLanguage('ua');
        } else {
            strings.setLanguage('en');
        }
        localStorage.setItem("language", strings.getLanguage());
        this.setState({...this.state, title: strings.serviceType});
    }

    setSearchTypeId = (typeId) => {
        this.setState({
            ...this.state,
            searchTypeId: typeId
        });
    };

    coords = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    ...this.state,
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    isLoading: false
                });
            });
        } else {
            alert(strings.geoError);
        }
    };

    onItemClick(res) {
        this.setState({
            serviceStations: res,
        });
    }

    componentDidMount() {
        this.coords()
    }

    render() {
        strings.setLanguage(localStorage.getItem("language"));
        return (
            <div className="contentContainer" style={{
                width: "900px",
                height: "800px"
            }}>
                {localStorage.getItem("login") === 'true' ? '' : <Redirect to={"/smart_road/login"}/>}
                <Header switchLanguage={this.switchLanguage}/>
                <div style={this.state.isLoading ? {
                    width: "100%",
                    height: "50px",
                    textAlign: "center"
                } : {display: 'none'}}>
                    <h2>{strings.getLoc}</h2>
                </div>
                <div>
                    <Form.Label style={{marginTop: "5px"}}>{strings.serviceType}: </Form.Label>
                    <ServiceTypesDropDown setTypeId={this.setSearchTypeId} />
                    <Button variant="primary" type="submit" style={{marginTop: "15px"}} onClick={() => {
                        let lat = this.state.lat;
                        let long = this.state.long;
                        let type = this.state.searchTypeId;
                        ServiceStationsService.getNearestStations(lat, long, type)
                            .then(res => {
                                this.onItemClick(res);
                            })
                            .catch(error => {
                                alert(`Error occurred: ${error}`)
                            })
                    }}>
                        {strings.submit}
                    </Button>
                </div>
                <div>
                    <Table striped bordered hover size="sm" style={{marginTop: "15px"}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{strings.tableName}</th>
                            <th>{strings.tableDesc}</th>
                            <th>{strings.tableCoords}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.serviceStations.map((station, index) => (
                                <tr>
                                    <td>{index}</td>
                                    <td>{station.name}</td>
                                    <td>{station.description}</td>
                                    <td>{station.latitude} - {station.longtitude}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}