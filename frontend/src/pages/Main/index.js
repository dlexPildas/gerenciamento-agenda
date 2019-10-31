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
    events: []
  };

  async componentDidMount() {
    const response = await api.get("/event", {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTcyNDY4ODk3LCJleHAiOjE1NzMwNzM2OTd9.aA1p4A8u2F-LEpDZf_iV8tzJfopFVvEHyDGGsVlbGaI"
      }
    });

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
