import React from "react";
import Header from "./ui/Header";
import ServiceTypesDropDown from "./ui/ServiceTypesDropDown"
import {Form, Button, Table} from "react-bootstrap";
import * as ServiceStationsService from '../services/ServiceStationsService'
import * as ServiceTypesService from '../services/ServiceTypesService'
import Copyright from "./ui/Copyright";
import {Redirect} from "react-router-dom";
import Map from "./ui/GoogleMaps"
import {withTranslation} from "react-i18next";

class OwnerPage extends React.Component {
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
        const {t} = this.props;
        return (
            <div className="contentContainer" style={{
                width: "950px",
                height: "1700px"
            }}>
                {localStorage.getItem("login") === 'true' ? '' : <Redirect to={"/smart_road/login"}/>}
                <Header switchLanguage={this.switchLanguage}/>
                <div className="ownerData">
                    <div className="ownerSegmentHeader">
                        <h2>{t("facilityHeader")}</h2>
                    </div>
                    <div className="ownerForm">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>{t("serviceName")} </Form.Label>
                            <Form.Control type="text" placeholder={t("serviceNamePlaceholder")}
                                          value={this.state.name}
                                          onChange={this.handleNameChange}/>

                            <Form.Label style={{marginTop: "5px"}}>{t("serviceDesc")} </Form.Label>
                            <Form.Control as="textarea" rows="3" value={this.state.desc}
                                          onChange={this.handleDescChange}
                                          placeholder={t("serviceDescPlaceholder")}/>

                            <Form.Label style={{marginTop: "5px"}}>{t("serviceLat")} </Form.Label>
                            <Form.Control type="number" step="0.1" placeholder="Enter latitude" value={this.state.lat}
                                          onChange={this.handleLatChange}/>

                            <Form.Label style={{marginTop: "5px"}}>{t("serviceLon")} </Form.Label>
                            <Form.Control type="number" step="0.1" placeholder="Enter longitude" value={this.state.long}
                                          onChange={this.handleLongChange}/>

                            <Form.Label style={{marginTop: "5px"}}>{t("serviceTypeHeader")} </Form.Label>
                            <ServiceTypesDropDown setTypeId={this.setTypeId} title={t("serviceTypeDrop")}/>

                            <div style={{marginTop: "10px", textAlign: "center"}}>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                                    {t("submit")}
                                </Button>
                            </div>
                        </Form.Group>
                    </div>
                </div>

                <div className="searchStation">
                    <div className="ownerSegmentHeader">
                        <h2>{t("searchHeader")}</h2>
                    </div>
                    <div style={{width: "100px", height: "130px", marginLeft: "5px"}}>
                        <Form.Label style={{marginTop: "5px"}}>{t("serviceTypeHeader")} </Form.Label>
                        <ServiceTypesDropDown setTypeId={this.setSearchTypeId}/>
                        <Button variant="primary" style={{marginTop: "10px"}} onClick={() =>
                            ServiceTypesService.getServices(this.state.searchTypeId)
                                .then(res => this.setState({...this.state, serviceStations: res}))
                                .catch(
                                    error => {
                                        alert(`Error occurred: ${error}`)
                                    })}>
                            {t("submit")}
                        </Button>
                    </div>
                    <div style={{marginTop: "20px"}}>
                        <Map centerLat={49.98835} centerLon={36.232845} services={this.state.serviceStations}/>
                    </div>
                </div>

                <div style={{width: "900px"}}>
                    <Copyright/>
                </div>
            </div>
        )
    }
}

export default withTranslation()(OwnerPage)