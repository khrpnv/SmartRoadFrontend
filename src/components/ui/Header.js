import React from "react";
import {Navbar, Nav, Button} from "react-bootstrap";
import {withRouter} from "react-router-dom";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" style={{cursor: "pointer"}}>
                    <Navbar.Brand onClick={() => {
                        this.props.history.push("/smart_road/main")
                    }}>Smart Road</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => {
                            this.props.history.push("/smart_road/main")
                        }}>Home</Nav.Link>
                        <Nav.Link onClick={() => {
                            this.props.history.push("/smart_road/owner")
                        }}>Owner</Nav.Link>
                        <Nav.Link onClick={() => {
                            this.props.history.push("/smart_road/driver")
                        }}>Driver</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <input type="image"
                               src="https://vectr.com/tmp/d2FW8O7NqE/d24YmVnnZD.png?width=640&height=640&select=d24YmVnnZDpage0"
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

export default withRouter(Header)