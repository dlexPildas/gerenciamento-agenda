import React, { Component } from "react";

import { Container, LoginComponent, Logo, Input, ButtonLogin } from "./styles";

import logo from "../../assets/logo.png";

export default class Login extends Component {
  render() {
    return (
      <Container>
        <LoginComponent>
          <Logo src={logo} alt="logo" />
          <Input type="text" placeholder="email" />
          <Input type="password" placeholder="senha" />
          <ButtonLogin>Entrar</ButtonLogin>
        </LoginComponent>
      </Container>
    );
  }
}
