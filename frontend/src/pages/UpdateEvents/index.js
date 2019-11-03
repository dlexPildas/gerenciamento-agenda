import React, { Component } from "react";

import { Container, ListUsers, SideLeft, SideRigth } from "./styles";
import FormEvents from "../../components/FormEvents";
import api from "../../services/api";

import { FaRegCalendarAlt, FaArrowLeft } from "react-icons/fa";

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
    const response = await api.get("/user");
    const response2 = await api.get(`/event/${this.props.id_event}/true`);

    this.setState({
      users: response.data,
      event: response2.data,
      name: response2.data.name,
      description: response2.data.description,
      date_event: response2.data.date_event,
      category: response2.data.category,
      place: response2.data.place
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
          <ListUsers>
            {users.length > 0 &&
              users.map(user => (
                <li key={user.id}>
                  <strong>{user.id}</strong>
                  <span>{user.email}</span>
                  <span>{user.name}</span>
                </li>
              ))}
          </ListUsers>
        </SideRigth>

        {/*  */}
      </Container>
    );
  }
}
