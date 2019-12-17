import React from "react";
import Header from "./ui/Header";
import * as ServiceStationsService from "../services/ServiceStationsService"
import {Button, Form, Table} from "react-bootstrap";
import ServiceTypesDropDown from "./ui/ServiceTypesDropDown";
import {Redirect} from "react-router-dom";
import Map from "./ui/GoogleMaps"
import axios from "axios";
import {withTranslation} from "react-i18next";

const BASE_URL = `https://smart-road.herokuapp.com/api/service_stations`;

class DriverPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 49.98835,
            serviceStations: [],
            long: 36.232845,
            isLoading: true,
            searchTypeId: -1
        };

        this.coords = this.coords.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.setSearchTypeId = this.setSearchTypeId.bind(this);
    }

    setSearchTypeId = (typeId) => {
        this.setState({
            ...this.state,
            serviceStations: [],
            searchTypeId: typeId
        });
    };

    coords = () => {
        const {t} = this.props;
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
            alert(t("geoError"));
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
        const {t} = this.props;
        return (
            <div className="contentContainer" style={{
                width: "900px",
                height: "900px"
            }}>
                {localStorage.getItem("login") === 'true' ? '' : <Redirect to={"/smart_road/login"}/>}
                <Header switchLanguage={this.switchLanguage}/>
                <div style={this.state.isLoading ? {
                    width: "100%",
                    height: "50px",
                    textAlign: "center"
                } : {display: 'none'}}>
                    <h2>{t("getLoc")}</h2>
                </div>
                <div>
                    <Form.Label style={{marginTop: "5px"}}>{t("serviceTypeHeader")}: </Form.Label>
                    <ServiceTypesDropDown setTypeId={this.setSearchTypeId}/>
                    <Button variant="primary" type="submit" style={{marginTop: "15px"}} onClick={() => {
                        let lat = this.state.lat;
                        let long = this.state.long;
                        let type = this.state.searchTypeId;
                        ServiceStationsService.getNearestStations(lat, long, type)
                            .then(res => {
                                const result = [];
                                res.forEach((item, index) => {
                                    axios.get(`${BASE_URL}/${item.id}/sensors/empty`).then(res1 => {
                                        if (res1.length !== 0) {
                                            result.push(item)
                                        }
                                        if (index === res.length - 1) {
                                            this.onItemClick(result);
                                        }
                                    })
                                });
                            })
                            .catch(error => {
                                alert(`Error occurred: ${error}`)
                            })
                    }}>
                        {t("submit")}
                    </Button>
                </div>
                <div style={{marginTop: "20px"}}>
                    <Map centerLat={this.state.lat} centerLon={this.state.long} services={this.state.serviceStations}/>
                </div>
            </div>
        )
    }
}

export default withTranslation()(DriverPage)