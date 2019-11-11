import React, { Component } from "react";

import { FaEye, FaCalendarPlus } from "react-icons/fa";

import { startOfDay, parseISO, format, isAfter, isEqual } from "date-fns";

import api from "../../services/api";
import { getId } from "../../services/auth";

import {
  Container,
  Filter,
  ListEvent,
  Dates,
  DateEvent,
  Action,
  ButtonParticipate
} from "./styles";

import Header from "../../components/Header";
import ContainerEvents from "../../components/ContainerEvents/index";

export default class Events extends Component {
  state = {
    events: []
  };

  async componentDidMount() {
    this.loadEvents();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loadEvents = async (date, param) => {
    if (date) {
      let response = await api.get(`/event/${1}`, {
        headers: {
          date_filter: document.getElementById("date_filter").value
        }
      });
      //check if the param is equal to 1 to add to url the headers of text's filter
      if (param === 1) {
        response = await api.get(`/event/${1}`, {
          headers: {
            date_filter: document.getElementById("date_filter").value,
            text_filter: document.getElementById("text_filter").value
          }
        });
      }

      if (response.data.error) {
        return alert(response.data.error);
      }

      this.setState({
        events: response.data
      });

      return;
    }

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
    return (
      <>
        <Header page={2} />
        <Container>
          <ContainerEvents>
            <Filter>
              <input
                id="date_filter"
                type="date"
                name="data"
                onChange={() => this.loadEvents("date", 0)}
              />

              <input
                id="text_filter"
                type="text"
                placeholder="buscar"
                onChange={() => this.loadEvents("date", 1)}
              />
            </Filter>
            <ListEvent>
              {this.state.events.map(
                event =>
                  (isAfter(
                    parseISO(event.date_event),
                    startOfDay(new Date())
                  ) ||
                    isEqual(
                      parseISO(event.date_event),
                      startOfDay(new Date())
                    )) && (
                    <li key={event.id}>
                      {console.log(event)}
                      <strong>{event.name}</strong>
                      <Dates>
                        <DateEvent>{`${format(
                          parseISO(event.date_event),
                          "dd/MM/yyyy hh:mm a"
                        )}`}</DateEvent>
                        <DateEvent>{`${format(
                          parseISO(event.date_event_final),
                          "dd/MM/yyyy hh:mm a"
                        )}`}</DateEvent>
                      </Dates>

                      <span>{event.place}</span>
                      <Action>
                        <div>
                          <FaEye
                            title={`nome do evento: ${event.name} \nlocal: ${event.place}\nDono: ${event.owner}\nDescrição: ${event.description}\nCategoria: ${event.category} `}
                          />
                        </div>

                        <ButtonParticipate
                          onClick={() =>
                            event.users.length !== 0
                              ? alert("Você já faz parte deste evento")
                              : this.handleParticipate(event.id)
                          }
                        >
                          <FaCalendarPlus />
                          <span>
                            {event.owner === parseInt(getId())
                              ? "Meu evento"
                              : event.users.length === 0
                              ? "Participar"
                              : "Já faço parte"}
                          </span>
                        </ButtonParticipate>
                      </Action>
                    </li>
                  )
              )}
              {/*  */}
            </ListEvent>
          </ContainerEvents>
        </Container>
      </>
    );
  }
}
