import React from "react";
import {Map, GoogleApiWrapper, Marker} from "google-maps-react";
import carWash from '../../images/carWash.svg'
import serviceStation from '../../images/serviceStation.svg'
import tyreFitting from '../../images/tyreFitting.svg'
import {Modal, Button} from "react-bootstrap";

const mapStyles = {
    width: '900px',
    height: '700px',
};

const markerIcons = [serviceStation, carWash, tyreFitting];

class GoogleMaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directions: null,
            show: false,
            service: null,
            link: ""
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }

    handleClose = () => {
        this.setState({
            ...this.state,
            show: false,
            service: null,
            link: ""
        });
    };

    handleShow = (service) => {
        this.setState({
            ...this.state,
            show: true,
            service: service,
            link: `http://www.google.com/maps/place/${service.latitude},${service.longtitude}`
        });
    };

    displayMarkers = () => {
        return this.props.services.map((service, index) => (
            <Marker
                key={index}
                id={index}
                position={{
                    lat: service.latitude,
                    lng: service.longtitude,
                }}
                icon={markerIcons[service.type - 1]}
                onClick={() => {
                    this.handleShow(service);
                }}/>
        ))
    };

    render() {
        return (
            <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.service != null ? this.state.service.name : "Service"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Description: {this.state.service != null ? this.state.service.description : "----------"}</p>
                        <p>
                            <a href={this.state.link} target={"_blank"}>
                                Open in Google Maps
                            </a>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Map
                    google={this.props.google}
                    zoom={12}
                    style={mapStyles}
                    initialCenter={{lat: this.props.centerLat, lng: this.props.centerLon}}
                >
                    <Marker position={{lat: this.props.centerLat, lng: this.props.centerLon}}/>

                    {this.displayMarkers()}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBVGcXo7O7F1EK8RiyEjd3TNofasUS-zMI'
})(GoogleMaps)