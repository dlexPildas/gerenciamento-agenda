import React from "react";

import { FaUserCircle, FaUserPlus } from "react-icons/fa";

import { Container, Info, ListUsers, Action, Voltar } from "./styles";

import api from "../../services/api";

export default class ListUsersComponent extends React.Component {
  state = {
    users: [],
    name_event: ""
  };

  async componentDidMount() {
    this.loadUsers();
  }

  handleAddUserEvent = async user_id => {
    const response = await api.post("/userToEvent", {
      user_id: user_id,
      event_id: this.props.event_id
    });

    if (response.data.error) {
      return alert(response.data.error);
    }

    this.loadUsers();

    return alert("Usuário adicionado ao evento!");
  };

  loadUsers = async () => {
    const response = await api.get(`userToEvent/${this.props.event_id}`);

    if (response.data.error) {
      return alert(response.data.error);
    }

    await this.setState({
      users: response.data.users,
      name_event: response.data.name_event
    });
  };

  render() {
    const { users, name_event } = this.state;
    return (
      <Container>
        <Info>
          <FaUserCircle />
          <h5>Adicionar usuários ao evento: {name_event} </h5>
        </Info>

        <ListUsers>
          {users.length > 0 ? (
            users.map(user => (
              <li key={user.id}>
                <span>{user.name}</span>
                <Action>
                  <FaUserPlus
                    onClick={() => this.handleAddUserEvent(user.id)}
                  />
                </Action>
              </li>
            ))
          ) : (
            <h3>Não há usuários disponíveis para este evento!</h3>
          )}
          <Voltar>
            <button onClick={this.props.change}>Voltar</button>
          </Voltar>
        </ListUsers>
      </Container>
    );
  }
}
