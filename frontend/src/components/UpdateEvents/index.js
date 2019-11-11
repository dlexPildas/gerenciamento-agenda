import React, { Component } from "react";

import { parseISO, startOfMinute, startOfDay } from "date-fns";

import {
  Container,
  Info,
  ListUsers,
  SideLeft,
  SideRigth,
  Action,
  Voltar
} from "./styles";
import FormEvents from "../FormEvents";
import api from "../../services/api";

import { FaUserCircle, FaTimesCircle } from "react-icons/fa";

export default class UpdateEvents extends Component {
  state = {
    users: [],
    event: {},
    name: "",
    description: "",
    date_event: new Date(),
    date_event_final: new Date(),
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

      category: response.data.category,
      place: response.data.place
    });

    await this.newDate();
  }

  newDate = () => {
    this.setState({
      date_event: `${startOfDay(
        parseISO(this.state.event.date_event)
      ).getFullYear()}-${`${startOfDay(
        parseISO(this.state.event.date_event)
      ).getMonth() + 1}`.padStart(2, 0)}-${`${startOfDay(
        parseISO(this.state.event.date_event)
      ).getDate()}`.padStart(2, 0)}T${`${startOfMinute(
        parseISO(this.state.event.date_event)
      ).getHours()}`.padStart(2, 0)}:${`${startOfMinute(
        parseISO(this.state.event.date_event)
      ).getMinutes()}`.padStart(2, 0)}`,

      date_event_final: `${startOfDay(
        parseISO(this.state.event.date_event_final)
      ).getFullYear()}-${`${startOfDay(
        parseISO(this.state.event.date_event_final)
      ).getMonth() + 1}`.padStart(2, 0)}-${`${startOfDay(
        parseISO(this.state.event.date_event_final)
      ).getDate()}`.padStart(2, 0)}T${`${startOfMinute(
        parseISO(this.state.event.date_event_final)
      ).getHours()}`.padStart(2, 0)}:${`${startOfMinute(
        parseISO(this.state.event.date_event_final)
      ).getMinutes()}`.padStart(2, 0)}`
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.date_event, this.state.date_event_final);
  };

  /**
   * function to create a event
   */
  handleSubmit = async () => {
    const {
      name,
      description,
      date_event,
      date_event_final,
      place,
      category
    } = this.state;

    if (
      name === "" ||
      description === "" ||
      date_event === "" ||
      date_event_final === "" ||
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
        date_event_final,
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
      date_event_final,
      category,
      place
    } = this.state;

    return (
      <Container>
        <SideLeft>
          {/* <FaArrowLeft onClick={this.props.change} /> */}
          <FormEvents
            update={1}
            name={name}
            description={description}
            date_event={date_event}
            date_event_final={date_event_final}
            category={category}
            place={place}
            change={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
          <Voltar>
            <button onClick={this.props.change}>Voltar</button>
          </Voltar>
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
      </Container>
    );
  }
}
