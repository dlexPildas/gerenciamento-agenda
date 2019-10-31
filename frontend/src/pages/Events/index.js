import React, { Component } from "react";

import { FaEye, FaCalendarPlus } from "react-icons/fa";

import api from "../../services/api";

import { Container, ListEvent, Action, ButtonParticipate } from "./styles";

import Header from "../../components/Header";
import ContainerEvents from "../../components/ContainerEvents/index";

export default class Events extends Component {
  state = {
    events: []
  };

  async componentDidMount() {
    const response = await api.get(`/event/${1}`);

    this.setState({
      events: response.data
    });
  }

  render() {
    const { events } = this.state;

    return (
      <>
        <Header page={2} />
        <Container>
          <ContainerEvents>
            <ListEvent>
              {events &&
                events.map(event => (
                  <li key={event.id}>
                    <strong>{event.name}</strong>
                    <span>{event.date_event}</span>
                    <span>{event.place}</span>
                    <Action>
                      <div>
                        <FaEye />
                      </div>

                      <ButtonParticipate>
                        <FaCalendarPlus />
                        <span>Participar</span>
                      </ButtonParticipate>
                    </Action>
                  </li>
                ))}
            </ListEvent>
          </ContainerEvents>
        </Container>
      </>
    );
  }
}
