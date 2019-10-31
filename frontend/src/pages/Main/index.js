import React, { Component } from "react";

import { FaRegCalendarAlt } from "react-icons/fa";

import api from "../../services/api";

import Header from "../../components/Header";

import {
  Container,
  ContainerEvents,
  Info,
  ListEvent,
  ContainerForm
} from "./styles";

import Events from "../../components/ContainerEvents";
import FormEvent from "../../components/FormEvents";

export default class Main extends Component {
  state = {
    events: [],
    name: "",
    description: "",
    date_event: Date(),
    place: "",
    category: ""
  };

  async componentDidMount() {
    const response = await api.get("/event");

    this.setState({
      events: response.data.events
    });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
      const response = await api.post("/event", {
        name,
        description,
        date_event,
        place,
        category
      });

      if (response.data.error) {
        return alert(response.data.error);
      }

      this.setState({
        name: "",
        description: "",
        date_event: Date(),
        place: "",
        category: ""
      });
    } catch (err) {
      alert("Erro ao criar o evento! Contate o suporte.");
      console.log(err);
    }
  };

  render() {
    const { events, name, description, date_event, place } = this.state;

    return (
      <>
        <Header page={1} />
        <Container>
          <ContainerEvents>
            <Events>
              <Info>
                <FaRegCalendarAlt />
                <h5>Eventos em andamento</h5>
              </Info>

              <ListEvent>
                {events.length > 0 &&
                  events.map(event => (
                    <li key={event.id}>
                      <strong>{event.name}</strong>
                      <span>{event.date_event}</span>
                      <span>{event.place}</span>
                    </li>
                  ))}
              </ListEvent>
            </Events>

            <Events>
              <Info>
                <FaRegCalendarAlt />
                <h5>Próximos eventos</h5>
              </Info>
              <ListEvent>
                {events.length > 0 &&
                  events.map(event => (
                    <li key={event.id}>
                      <strong>{event.name}</strong>
                      <span>{event.date_event}</span>
                      <span>{event.place}</span>
                    </li>
                  ))}
              </ListEvent>
            </Events>
          </ContainerEvents>
          <ContainerForm>
            <FormEvent
              name={name}
              description={description}
              date_event={date_event}
              place={place}
              change={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </ContainerForm>
        </Container>
      </>
    );
  }
}
