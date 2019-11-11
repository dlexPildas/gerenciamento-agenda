import React, { Component } from "react";

import api from "../../services/api";

import { login, saveId } from "../../services/auth";

import { FaUserCircle } from "react-icons/fa";

import {
  Container,
  LoginComponent,
  RegisterUser,
  Logo,
  Error,
  Input,
  Button,
  Actions
} from "./styles";

import logo from "../../assets/logo.png";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errorEmail: false,
    errorPassword: false,
    messageEmail: "",
    messagePassword: "",
    new_name: "",
    new_email: "",
    new_password: "",
    register: 0
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //fuction to check a attribute register is 0 and update some others attributes
  handleIsRegister = () => {
    if (this.state.register === 0) {
      return this.setState({
        register: 1,
        errorEmail: false,
        errorPassword: false,
        messageEmail: "",
        messagePassword: "",
        new_name: "",
        new_email: "",
        new_password: ""
      });
    }
    return this.setState({
      register: 0
    });
  };

  //function to perform login
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

  //Fuction to register a new user
  handleRegister = async () => {
    const { new_name, new_email, new_password } = this.state;

    if (new_name === "" || new_email === "" || new_password === "") {
      return alert("Preencha todos os campos!");
    }

    const response = await api.post("/user", {
      name: this.state.new_name,
      email: this.state.new_email,
      password: this.state.new_password
    });

    if (response.data.error) {
      return alert(response.data.error);
    }

    alert("User was did register with success");
    return this.handleIsRegister();
  };

  render() {
    const {
      email,
      password,
      errorEmail,
      errorPassword,
      messageEmail,
      messagePassword,
      register,
      new_email,
      new_name,
      new_password
    } = this.state;

    return (
      <Container>
        <LoginComponent register={register}>
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
          <Button onClick={this.handleSubmit}>Entrar</Button>
          <Actions>
            <span>
              Não tem conta? <a onClick={this.handleIsRegister}>CADASTRE-SE!</a>
            </span>
          </Actions>
        </LoginComponent>
        <RegisterUser register={this.state.register}>
          <h1>
            <FaUserCircle /> Criar uma nova conta
          </h1>

          <label>
            Informe seu nome:
            <Input
              type="text"
              value={new_name}
              name="new_name"
              onChange={this.handleChange}
            />
          </label>

          <label>
            Informe seu email:
            <Input
              type="text"
              value={new_email}
              name="new_email"
              onChange={this.handleChange}
            />
          </label>
          <label>
            Informe sua senha:
            <Input
              type="password"
              value={new_password}
              name="new_password"
              onChange={this.handleChange}
            />
          </label>
          <Button onClick={this.handleRegister}>Cadastrar</Button>
          <Button color="#666" onClick={this.handleIsRegister}>
            Voltar
          </Button>
        </RegisterUser>
      </Container>
    );
  }
}
