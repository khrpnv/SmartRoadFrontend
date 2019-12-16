import React from "react";
import {Navbar, Nav, Button, Image} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import LocalizedStrings from 'react-localization';
import logoutImage from '../../images/logout.png'

let strings = new LocalizedStrings({
    en: {
        home: "Home",
        owner: "Owner",
        driver: "Driver",
        switchLanguage: "Switch Language"
    },
    ua: {
        home: "Головна",
        owner: "Власникам",
        driver: "Водіям",
        switchLanguage: "Змінити Мову"
    }
});

class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        strings.setLanguage(localStorage.getItem("language"));
        return (
            <>
                <Navbar bg="dark" variant="dark" style={{cursor: "pointer"}}>
                    <Navbar.Brand onClick={() => {
                        this.props.history.push("/smart_road/main")
                    }}>Smart Road</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link style={this.props.location.pathname === '/smart_road/main'
                            ? {textDecoration: "underline"} : {textDecoration: 'none'}}
                                  onClick={() => {
                                      this.props.history.push("/smart_road/main")
                                  }}>{strings.home}</Nav.Link>
                        <Nav.Link style={this.props.location.pathname === '/smart_road/owner'
                            ? {textDecoration: "underline"} : {textDecoration: 'none'}}
                                  onClick={() => {
                                      this.props.history.push("/smart_road/owner")
                                  }}>{strings.owner}</Nav.Link>
                        <Nav.Link style={this.props.location.pathname === '/smart_road/driver'
                            ? {textDecoration: "underline"} : {textDecoration: 'none'}}
                                  onClick={() => {
                                      this.props.history.push("/smart_road/driver")
                                  }}>{strings.driver}</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Button
                            style={{marginRight: "20px"}}
                            variant="outline-success"
                            onClick={this.props.switchLanguage}>
                            {strings.switchLanguage}
                        </Button>
                        <img src={logoutImage}
                             style={{
                                 width: "30px",
                                 height: "30px"
                             }}
                             onClick={() => {
                                 localStorage.setItem('login', 'false');
                                 let prevValue = localStorage.getItem("language");
                                 localStorage.setItem("language", prevValue);
                                 this.props.history.push('/smart_road/login')
                             }}
                        />
                    </Navbar.Collapse>
                </Navbar>

            </>
        )
    }
}

export default withRouter(Header)