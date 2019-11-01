import React, { Component } from "react";

import { Container, ListUsers, SideLeft, SideRigth } from "./styles";
import FormEvents from "../../components/FormEvents";
import api from "../../services/api";

import { FaRegCalendarAlt } from "react-icons/fa";

export default class UpdateEvents extends Component {
  state = {
    users: []
  };

  async componentDidMount() {
    const response = await api.get("user");

    this.setState({
      users: response.data
    });
  }

  render() {
    const { users } = this.state;

    return (
      <Container>
        <SideLeft>
          <FaRegCalendarAlt onClick={this.props.change} />
          <ListUsers>
            {users.length > 0 &&
              users.map(user => (
                <li key={user.id}>
                  <strong>{user.id}</strong>
                  <span>{user.email}</span>
                  <span>{user.name}</span>
                </li>
              ))}
          </ListUsers>
        </SideLeft>

        <SideRigth>
          <FormEvents update={1} />
        </SideRigth>

        {/*  */}
      </Container>
    );
  }
}
