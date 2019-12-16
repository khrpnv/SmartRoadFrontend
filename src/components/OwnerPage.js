import React from "react";
import Header from "./ui/Header";
import ServiceTypesDropDown from "./ui/ServiceTypesDropDown"
import {Form, Button, Table} from "react-bootstrap";
import * as ServiceStationsService from '../services/ServiceStationsService'
import * as ServiceTypesService from '../services/ServiceTypesService'
import Copyright from "./ui/Copyright";
import {Redirect} from "react-router-dom";
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        facilityHeader: "Add your facility",
        serviceName: "Service name:",
        serviceNamePlaceholder: "Enter name",
        serviceDesc: "Service description:",
        serviceDescPlaceholder: "Enter description",
        serviceLat: "Service latitude:",
        serviceLon: "Service longitude:",
        serviceType: "Service type:",
        serviceTypeDrop: "Service Type",
        submit: "Submit",
        searchHeader: "Search for facility",
        tableName: "Name",
        tableDesc: "Description",
        tableLoc: "Location"
    },
    ua: {
        facilityHeader: "Додати установу",
        serviceName: "Ім'я установи:",
        serviceNamePlaceholder: "Введіть ім'я",
        serviceDesc: "Опис установи:",
        serviceDescPlaceholder: "Введіть опис",
        serviceLat: "Координата широти:",
        serviceLon: "Координата довготи:",
        serviceType: "Тип сервісу:",
        serviceTypeDrop: "Тип Сервісу",
        submit: "Підтвердити",
        searchHeader: "Пошук установи",
        tableName: "Ім'я",
        tableDesc: "Опис",
        tableLoc: "Місцезнаходження"
    }
});

export default class OwnerPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeId: -1,
            name: "",
            desc: "",
            lat: 0,
            long: 0,
            serviceStations: [],
            searchTypeId: -1
        };

        this.setTypeId = this.setTypeId.bind(this);
        this.setSearchTypeId = this.setSearchTypeId.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleLongChange = this.handleLongChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.setState({...this.state});
    }

    setTypeId = (typeId) => {
        this.setState({
            ...this.state,
            typeId: typeId
        })
    };

    setSearchTypeId = (typeId) => {
        this.setState({
            ...this.state,
            searchTypeId: typeId
        });
    };

    handleNameChange(event) {
        this.setState({
            ...this.state,
            name: event.target.value
        });
    }

    handleDescChange(event) {
        this.setState({
            ...this.state,
            desc: event.target.value
        });
    }

    handleLatChange(event) {
        this.setState({
            ...this.state,
            lat: Number.parseFloat(event.target.value)
        });
    }

    handleLongChange(event) {
        this.setState({
            ...this.state,
            long: Number.parseFloat(event.target.value)
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        ServiceStationsService.postServiceStation({
            name: this.state.name,
            description: this.state.desc,
            latitude: this.state.lat,
            longtitude: this.state.long,
            type: this.state.typeId
        }).then(res => {
            alert("Success");
            this.setState({
                typeId: -1,
                name: "",
                desc: "",
                lat: 0,
                long: 0
            })
        }).catch(error => {
            alert(`Error occurred: ${error}`)
        })

    }

    render() {
        strings.setLanguage(localStorage.getItem("language"));
        return (
            <div className="contentContainer" style={{
                width: "900px",
                height: "1500px"
            }}>
                {localStorage.getItem("login") === 'true' ? '' : <Redirect to={"/smart_road/login"}/>}
                <Header switchLanguage={this.switchLanguage}/>
                <div className="ownerData">
                    <div className="ownerSegmentHeader">
                        <h2>{strings.facilityHeader}</h2>
                    </div>
                    <div className="ownerForm">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>{strings.serviceName} </Form.Label>
                            <Form.Control type="text" placeholder={strings.serviceNamePlaceholder}
                                          value={this.state.name}
                                          onChange={this.handleNameChange}/>

                            <Form.Label style={{marginTop: "5px"}}>{strings.serviceDesc} </Form.Label>
                            <Form.Control as="textarea" rows="3" value={this.state.desc}
                                          onChange={this.handleDescChange}
                                          placeholder={strings.serviceDescPlaceholder}/>

                            <Form.Label style={{marginTop: "5px"}}>{strings.serviceLat} </Form.Label>
                            <Form.Control type="number" step="0.1" placeholder="Enter latitude" value={this.state.lat}
                                          onChange={this.handleLatChange}/>

                            <Form.Label style={{marginTop: "5px"}}>{strings.serviceLon} </Form.Label>
                            <Form.Control type="number" step="0.1" placeholder="Enter longitude" value={this.state.long}
                                          onChange={this.handleLongChange}/>

                            <Form.Label style={{marginTop: "5px"}}>{strings.serviceType} </Form.Label>
                            <ServiceTypesDropDown setTypeId={this.setTypeId} title={strings.serviceTypeDrop}/>

                            <div style={{marginTop: "10px", textAlign: "center"}}>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                    {strings.submit}
                                </Button>
                            </div>
                        </Form.Group>
                    </div>
                </div>

                <div className="searchStation">
                    <div className="ownerSegmentHeader">
                        <h2>{strings.searchHeader}</h2>
                    </div>
                    <div style={{width: "100px", height: "130px", marginLeft: "5px"}}>
                        <Form.Label style={{marginTop: "5px"}}>{strings.serviceType} </Form.Label>
                        <ServiceTypesDropDown setTypeId={this.setSearchTypeId} title={strings.serviceTypeDrop}/>
                        <Button variant="primary" style={{marginTop: "10px"}} onClick={() =>
                            ServiceTypesService.getServices(this.state.searchTypeId)
                                .then(res => this.setState({...this.state, serviceStations: res}))
                                .catch(
                                    error => {
                                        alert(`Error occurred: ${error}`)
                                    })}>
                            {strings.submit}
                        </Button>
                    </div>
                    <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{strings.tableName}</th>
                            <th>{strings.tableDesc}</th>
                            <th>{strings.tableLoc}</th>
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

                <div style={{width: "900px"}}>
                    <Copyright/>
                </div>
            </div>
        )
    }
}