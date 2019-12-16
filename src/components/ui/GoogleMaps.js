import React from "react";
import {Map, GoogleApiWrapper, Marker} from "google-maps-react";
import carWash from '../../images/carWash.svg'
import serviceStation from '../../images/serviceStation.svg'
import tyreFitting from '../../images/tyreFitting.svg'

const mapStyles = {
    width: '900px',
    height: '700px',
};

const markerIcons = [serviceStation, carWash, tyreFitting];

class GoogleMaps extends React.Component {
    constructor(props) {
        super(props);
    }

    displayMarkers = () => {
        console.log(this.props.services);
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
                    let message = `Name: ${service.name}\nDescription: ${service.description}`;
                    alert(message)
                }}/>
        ))
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{lat: this.props.centerLat, lng: this.props.centerLon}}
            >
                <Marker position={{lat: this.props.centerLat, lng: this.props.centerLon}}/>

                {this.displayMarkers()}
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBVGcXo7O7F1EK8RiyEjd3TNofasUS-zMI'
})(GoogleMaps)