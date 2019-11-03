import React, { Component } from "react";

import {
  Container,
  Info,
  ListUsers,
  SideLeft,
  SideRigth,
  Action
} from "./styles";
import FormEvents from "../../components/FormEvents";
import api from "../../services/api";

import {
  FaRegCalendarAlt,
  FaArrowLeft,
  FaUserCircle,
  FaUserPlus,
  FaTimesCircle
} from "react-icons/fa";

export default class UpdateEvents extends Component {
  state = {
    users: [],
    event: {},
    name: "",
    description: "",
    date_event: "",
    category: "",
    place: ""
  };

  async componentDidMount() {
    const response = await api.get(`/event/${this.props.id_event}/true`);

    this.setState({
      users: response.data.users,
      event: response.data,
      name: response.data.name,
      description: response.data.description,
      date_event: response.data.date_event,
      category: response.data.category,
      place: response.data.place
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /**
   * function to create a event
   */
  handleSubmit = async () => {
    const { name, description, date_event, place, category } = this.state;

    if (
      name === "" ||
      description === "" ||
      date_event === "" ||
      place === "" ||
      category === ""
    ) {
      return alert("Preencha todos os campos!");
    }

    try {
      const response = await api.put("/event", {
        event_id: this.state.event.id,
        name,
        description,
        date_event,
        place,
        category
      });

      if (response.data.error) {
        return alert(response.data.error);
      }

      return alert("Evento atualizado com sucesso!");
    } catch (err) {
      alert("Erro ao criar o evento! Contate o suporte.");
    }
  };

  render() {
    const {
      users,
      name,
      description,
      date_event,
      category,
      place
    } = this.state;

    return (
      <Container>
        <SideLeft>
          <FaArrowLeft onClick={this.props.change} />
          <FormEvents
            update={1}
            name={name}
            description={description}
            date_event={date_event}
            category={category}
            place={place}
            change={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </SideLeft>

        <SideRigth>
          <Info>
            <FaUserCircle />
            <h5>Participantes do evento</h5>
          </Info>

          <ListUsers>
            {users.length > 0 &&
              users.map(user => (
                <li key={user.id}>
                  <strong>{user.id}</strong>
                  <span>{user.email}</span>
                  <span>{user.name}</span>
                  <Action>
                    <FaTimesCircle />
                  </Action>
                </li>
              ))}
          </ListUsers>
        </SideRigth>

        {/*  */}
      </Container>
    );
  }
}
