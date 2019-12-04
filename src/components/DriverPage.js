import React from "react";
import Header from "./ui/Header";
import * as ServiceStationsService from "../services/ServiceStationsService"
import {Button, Form, Table} from "react-bootstrap";
import ServiceTypesDropDown from "./ui/ServiceTypesDropDown";

export default class DriverPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            serviceStations: [],
            long: 0,
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
            alert("Geolocation is not supported by this browser.");
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
        return (
            <div className="contentContainer" style={{
                width: "900px",
                height: "800px"
            }}>
                <Header/>
                <div style={this.state.isLoading ? {
                    width: "100%",
                    height: "50px",
                    textAlign: "center"
                } : {display: 'none'}}>
                    <h2>Getting your current location...</h2>
                </div>
                <div>
                    <Form.Label style={{marginTop: "5px"}}>Service type: </Form.Label>
                    <ServiceTypesDropDown setTypeId={this.setSearchTypeId}/>
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
                        Submit
                    </Button>
                </div>
                <div>
                    <Table striped bordered hover size="sm" style={{marginTop: "15px"}}>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Location</th>
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