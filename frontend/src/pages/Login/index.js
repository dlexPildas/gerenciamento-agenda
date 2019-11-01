import React, { Component } from "react";

import api from "../../services/api";

import { login, saveId } from "../../services/auth";

import {
  Container,
  LoginComponent,
  Logo,
  Error,
  Input,
  ButtonLogin
} from "./styles";

import logo from "../../assets/logo.png";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errorEmail: false,
    errorPassword: false,
    messageEmail: "",
    messagePassword: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.password);
  };

  handleSubmit = async () => {
    const { email, password } = this.state;

    if (email === "") {
      this.setState({ errorEmail: true, messageEmail: "informe um email" });
      return;
    }

    this.setState({ errorEmail: false, messageEmail: "" });

    if (password === "") {
      this.setState({
        errorPassword: true,
        messagePassword: "informe uma senha"
      });
      return;
    }

    this.setState({ errorPassword: false, messagePassword: "" });

    const response = await api.post("/session", {
      email,
      password
    });

    if (response.data.error) {
      return alert(response.data.error);
    }

    login(response.data.token);
    saveId(response.data.id);

    this.props.history.push("/main");
  };

  render() {
    const {
      email,
      password,
      errorEmail,
      errorPassword,
      messageEmail,
      messagePassword
    } = this.state;

    return (
      <Container>
        <LoginComponent>
          <Logo src={logo} alt="logo" />
          {errorEmail && <Error>{messageEmail}</Error>}

          <Input
            type="text"
            value={email}
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          {errorPassword && <Error>{messagePassword}</Error>}

          <Input
            type="password"
            value={password}
            name="password"
            placeholder="senha"
            onChange={this.handleChange}
          />
          <ButtonLogin onClick={this.handleSubmit}>Entrar</ButtonLogin>
        </LoginComponent>
      </Container>
    );
  }
}
