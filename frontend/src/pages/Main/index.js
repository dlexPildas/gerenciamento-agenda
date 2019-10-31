import React, { Component } from "react";

import { FaRegCalendarAlt } from "react-icons/fa";

import api from "../../services/api";
import { getToken } from "../../services/auth";

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
    events: []
  };

  async componentDidMount() {
    const response = await api.get("/event");

    this.setState({
      events: response.data.events
    });
  }

  render() {
    const { events } = this.state;

    return (
      <>
        <Header />
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
            <FormEvent />
          </ContainerForm>
        </Container>
      </>
    );
  }
}
