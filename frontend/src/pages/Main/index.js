import React, { Component } from "react";

import { FaRegCalendarAlt } from "react-icons/fa";

import api from "../../services/api";

import { Container, Info, ListEvent, Subscribed } from "./styles";

import ContainerEvents from "../../components/ContainerEvents";

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

    console.log(response.data);

    this.setState({
      events: response.data.events
    });
  }

  render() {
    const { events } = this.state;

    return (
      <Container>
        <ContainerEvents>
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
        </ContainerEvents>

        <ContainerEvents>
          <Info>
            <FaRegCalendarAlt />
            <h5>Próximos eventos</h5>
          </Info>
          <ListEvent>
            <li>
              <strong>Picnic</strong>
              <span>29-11-2019</span>
              <Subscribed>
                <strong>75</strong>
                <span>pessoas</span>
              </Subscribed>
            </li>

            <li>
              <strong>Picnic</strong>
              <span>29-11-2019</span>
              <Subscribed>
                <strong>75</strong>
                <span>pessoas</span>
              </Subscribed>
            </li>

            <li>
              <strong>Picnic</strong>
              <span>29-11-2019</span>
              <Subscribed>
                <strong>75</strong>
                <span>pessoas</span>
              </Subscribed>
            </li>
          </ListEvent>
        </ContainerEvents>
      </Container>
    );
  }
}
