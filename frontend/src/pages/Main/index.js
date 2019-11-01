import React, { Component } from "react";

import { startOfDay, parseISO, format, isAfter, isEqual } from "date-fns";

import { FaRegCalendarAlt, FaUserPlus } from "react-icons/fa";

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
    await this.loadEvents();

    console.log(
      format(parseISO(this.state.events[0].date_event), "MM/dd/yyyy")
    );
  }

  loadEvents = async () => {
    const response = await api.get("/event");

    await this.setState({
      events: []
    });

    this.setState({
      events: this.state.events.concat(
        response.data.events,
        response.data.user.events
      )
    });
  };

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

      this.loadEvents();
    } catch (err) {
      alert("Erro ao criar o evento! Contate o suporte.");
      console.log(err);
    }
  };

  render() {
    const {
      events,
      name,
      description,
      date_event,
      place,
      category
    } = this.state;

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
                  events.map(
                    event =>
                      isEqual(
                        parseISO(event.date_event),
                        startOfDay(new Date())
                      ) && (
                        <li key={event.id}>
                          <strong>{event.name}</strong>
                          <span>{`${format(
                            parseISO(event.date_event),
                            "dd/MM/yyyy"
                          )}`}</span>
                          <span>{event.place}</span>

                          {event.user_owner && (
                            <FaUserPlus
                              onClick={() => alert()}
                              title="Adicionar um novo participante"
                            />
                          )}
                        </li>
                      )
                  )}
              </ListEvent>
            </Events>

            <Events>
              <Info>
                <FaRegCalendarAlt />
                <h5>Próximos eventos</h5>
              </Info>
              <ListEvent>
                {events.length > 0 &&
                  events.map(
                    event =>
                      isAfter(
                        parseISO(event.date_event),
                        startOfDay(new Date())
                      ) && (
                        <li key={event.id}>
                          <strong>{event.name}</strong>
                          <span>{`${format(
                            parseISO(event.date_event),
                            "dd/MM/yyyy"
                          )}`}</span>
                          <span>{event.place}</span>
                        </li>
                      )
                  )}
              </ListEvent>
            </Events>
          </ContainerEvents>
          <ContainerForm>
            <FormEvent
              name={name}
              description={description}
              date_event={date_event}
              category={category}
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
