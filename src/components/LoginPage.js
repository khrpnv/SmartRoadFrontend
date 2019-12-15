import React from "react";
import {Form, Button} from "react-bootstrap";
import * as UsersService from "../services/UsersService";

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };

        this.handleSignUpEmailChange = this.handleSignUpEmailChange.bind(this);
        this.handleSignUpPasswordChange = this.handleSignUpPasswordChange.bind(this);
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
        this.handleLogInSubmit = this.handleLogInSubmit.bind(this);
        this.checkInputFields = this.checkInputFields.bind(this);
    }

    checkInputFields() {
        if (this.state.email.trim().length === 0 || this.state.password.trim().length === 0) {
            alert("Empty input is not allowed");
            return false
        }
        return true
    }

    handleSignUpEmailChange(event) {
        this.setState({
            ...this.state,
            email: event.target.value
        });
    }

    handleSignUpPasswordChange(event) {
        this.setState({
            ...this.state,
            password: event.target.value
        });
    }

    handleSignUpSubmit(event) {
        event.preventDefault();
        if (!this.checkInputFields()) {
            return
        }
        UsersService.registerUser({
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            localStorage.setItem("login", 'true');
            this.props.history.push("/smart_road/main")
        }).catch(error => {
            alert(`${error.response.data.reason}`)
        })
    }

    handleLogInSubmit(event) {
        event.preventDefault();
        if (!this.checkInputFields()) {
            return
        }
        UsersService.login({
            email: this.state.email,
            password: this.state.password
        }).then(() => {
            localStorage.setItem("login", 'true');
            console.log(localStorage.getItem('login'));
            this.props.history.push("/smart_road/main")
        }).catch(error => {
            alert(`${error.response.data.reason}`)
        })
    }

    render() {
        return (
            <div className="contentContainer" style={{
                width: "500px",
                height: "350px"
            }}>
                <h1 style={{textAlign: "center"}}>Authorization</h1>
                <div className="formDivs" style={{
                    margin: "auto",
                }}>
                    <Form style={{marginLeft: "10px", width: "95%"}}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                          required
                                          placeholder="Enter email"
                                          value={this.state.email}
                                          onChange={this.handleSignUpEmailChange}
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          required
                                          placeholder="Password"
                                          value={this.state.password}
                                          onChange={this.handleSignUpPasswordChange}
                            />
                        </Form.Group>
                        <Button variant="primary"
                                type="submit"
                                onClick={this.handleLogInSubmit}
                                style={{float: "left", marginLeft: "100px"}}
                        >
                            Log in
                        </Button>
                        <Button variant="primary"
                                type="submit"
                                onClick={this.handleSignUpSubmit}
                                style={{float: "right", marginRight: "100px"}}
                        >
                            Sign up
                        </Button>
                    </Form>
                </div>

            </div>
        )
    }
}