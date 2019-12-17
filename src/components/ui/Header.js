import React from "react";
import {Navbar, Nav, Button, Image} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import logoutImage from '../../images/logout.png'
import switchLanguage from "../../services/i18nService";
import {withTranslation} from "react-i18next";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {t} = this.props;
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
                                  }}>{t("home")}</Nav.Link>
                        <Nav.Link style={this.props.location.pathname === '/smart_road/owner'
                            ? {textDecoration: "underline"} : {textDecoration: 'none'}}
                                  onClick={() => {
                                      this.props.history.push("/smart_road/owner")
                                  }}>{t("owner")}</Nav.Link>
                        <Nav.Link style={this.props.location.pathname === '/smart_road/driver'
                            ? {textDecoration: "underline"} : {textDecoration: 'none'}}
                                  onClick={() => {
                                      this.props.history.push("/smart_road/driver")
                                  }}>{t("driver")}</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Button
                            style={{marginRight: "20px"}}
                            variant="outline-success"
                            onClick={() => switchLanguage()}>
                            {t("switchLanguage")}
                        </Button>
                        <img src={logoutImage}
                             style={{
                                 width: "30px",
                                 height: "30px"
                             }}
                             onClick={() => {
                                 localStorage.setItem('login', 'false');
                                 this.props.history.push('/smart_road/login')
                             }}
                        />
                    </Navbar.Collapse>
                </Navbar>

            </>
        )
    }
}

export default withRouter(withTranslation()(Header))