import React, { Component } from "react";

import { FaEye, FaCalendarPlus, FaRegSadTear } from "react-icons/fa";

import { startOfDay, parseISO, format, isAfter, isEqual } from "date-fns";

import api from "../../services/api";
import { getId } from "../../services/auth";

import { Container, ListEvent, Action, ButtonParticipate } from "./styles";

import Header from "../../components/Header";
import ContainerEvents from "../../components/ContainerEvents/index";

export default class Events extends Component {
  state = {
    events: []
  };

  async componentDidMount() {
    this.loadEvents();
  }

  loadEvents = async () => {
    const response = await api.get(`/event/${1}`);

    this.setState({
      events: response.data
    });
  };

  handleParticipate = async event_id => {
    const response = await api.post("/userToEvent", {
      user_id: parseInt(getId()),
      event_id: event_id
    });

    return (
      response.data.error
        ? alert(response.data.error)
        : alert("Parabéns! Você participará deste evento!"),
      this.loadEvents()
    );
  };

  render() {
    const { events } = this.state;

    return (
      <>
        <Header page={2} />
        <Container>
          <ContainerEvents>
            <ListEvent>
              {events &&
                events.map(
                  event =>
                    isAfter(
                      parseISO(event.date_event),
                      startOfDay(new Date())
                    ) &&
                    event.users.length === 0 && (
                      <li key={event.id}>
                        <strong>{event.name}</strong>
                        <span>{`${format(
                          parseISO(event.date_event),
                          "dd/MM/yyyy"
                        )}`}</span>
                        <span>{event.place}</span>
                        <Action>
                          <div>
                            <FaEye />
                          </div>

                          <ButtonParticipate
                            onClick={() => this.handleParticipate(event.id)}
                          >
                            <FaCalendarPlus />
                            <span>Participar</span>
                          </ButtonParticipate>
                        </Action>
                      </li>
                    )
                )}
            </ListEvent>
          </ContainerEvents>
        </Container>
      </>
    );
  }
}
