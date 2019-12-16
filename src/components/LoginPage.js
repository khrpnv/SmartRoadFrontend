import React from "react";
import {Form, Button} from "react-bootstrap";
import * as UsersService from "../services/UsersService";
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en: {
        header: "Authorization",
        emailHeader: "Email address",
        passwordHeader: "Password",
        emailPlaceholder: "Enter email",
        emailDesc: "We'll never share your email with anyone else.",
        loginButton: "Log in",
        signupButton: "Sign up",
        switchLanguage: "Switch Language"
    },
    ua: {
        header: "Авторизація",
        emailHeader: "Електронна пошта",
        passwordHeader: "Пароль",
        emailPlaceholder: "Введіть поштову адресу",
        emailDesc: "Ці дані не будуть доступні жодному з користувачів.",
        loginButton: "Увійти",
        signupButton: "Зареєструватись",
        switchLanguage: "Змінити Мову"
    }
});

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
        let language = localStorage.getItem("language") === "null" ? 'en' : localStorage.getItem("language");
        strings.setLanguage(language);
        localStorage.setItem("language", language);
        return (
            <div className="contentContainer" style={{
                width: "500px",
                height: "400px"
            }}>
                <h1 style={{textAlign: "center"}}>{strings.header}</h1>
                <div className="formDivs" style={{
                    margin: "auto",
                }}>
                    <Form style={{marginLeft: "10px", width: "95%"}}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>{strings.emailHeader}</Form.Label>
                            <Form.Control type="email"
                                          required
                                          placeholder={strings.emailPlaceholder}
                                          value={this.state.email}
                                          onChange={this.handleSignUpEmailChange}
                            />
                            <Form.Text className="text-muted">
                                {strings.emailDesc}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>{strings.passwordHeader}</Form.Label>
                            <Form.Control type="password"
                                          required
                                          placeholder={strings.passwordHeader}
                                          value={this.state.password}
                                          onChange={this.handleSignUpPasswordChange}
                            />
                        </Form.Group>
                        <Button variant="primary"
                                type="submit"
                                onClick={this.handleLogInSubmit}
                                style={{float: "left", marginLeft: "80px"}}>
                            {strings.loginButton}
                        </Button>
                        <Button variant="primary"
                                type="submit"
                                onClick={this.handleSignUpSubmit}
                                style={{float: "right", marginRight: "80px"}}>
                            {strings.signupButton}
                        </Button>
                    </Form>
                </div>
                <div style={{margin: "auto", width: "200px", textAlign: "center"}}>
                    <Button variant="success"
                            style={{marginTop: "20px"}}
                            onClick={this.switchLanguage}>
                        {strings.switchLanguage}
                    </Button>
                </div>
            </div>
        )
    }
}