import React from "react";

import { startOfDay, parseISO, format } from "date-fns";

import { FaCalendarPlus, FaPlusCircle } from "react-icons/fa";

import { Container, Title, Dates } from "./styles";

export default class FormEvents extends React.Component {
  render() {
    return (
      <Container>
        <Title>
          <FaCalendarPlus />
          <h5>
            {this.props.update ? "Editar evento" : "Crie um novo evento!"}
          </h5>
        </Title>

        <input
          type="text"
          value={this.props.name}
          name="name"
          onChange={this.props.change}
          placeholder="nome"
        />

        <input
          type="text"
          value={this.props.description}
          name="description"
          onChange={this.props.change}
          placeholder="descrição"
        />
        <Dates>
          <label>
            <span>Data início:</span>
            <input
              type="datetime-local"
              value={this.props.date_event}
              name="date_event"
              onChange={this.props.change}
              placeholder="data"
            />
          </label>
          <label>
            <span>Data fim:</span>
            <input
              type="datetime-local"
              value={this.props.date_event_final}
              name="date_event_final"
              onChange={this.props.change}
              placeholder="data"
            />
          </label>
        </Dates>
        <input
          type="text"
          value={this.props.place}
          name="place"
          onChange={this.props.change}
          placeholder="local"
        />
        <input
          type="text"
          value={this.props.category}
          name="category"
          onChange={this.props.change}
          placeholder="categoria"
        />

        <button onClick={this.props.handleSubmit}>
          {this.props.update ? "Atualizar" : <FaPlusCircle />}
        </button>
      </Container>
    );
  }
}
