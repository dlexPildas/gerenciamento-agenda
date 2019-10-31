import React from "react";

import { FaCalendarPlus, FaPlusCircle } from "react-icons/fa";

import { Container, Title } from "./styles";

export default function FormEvents({
  name,
  description,
  date_event,
  place,
  category,
  change,
  handleSubmit
}) {
  return (
    <Container>
      <Title>
        <FaCalendarPlus />
        <h5>Crie um novo evento!</h5>
      </Title>

      <input
        type="text"
        value={name}
        name="name"
        onChange={change}
        placeholder="nome"
      />
      <input
        type="text"
        value={description}
        name="description"
        onChange={change}
        placeholder="descrição"
      />
      <input
        type="date"
        value={date_event}
        name="date_event"
        onChange={change}
        placeholder="data"
      />
      <input
        type="text"
        value={place}
        name="place"
        onChange={change}
        placeholder="local"
      />

      <input
        type="text"
        value={category}
        name="category"
        onChange={change}
        placeholder="categoria"
      />

      <button onClick={handleSubmit}>
        <FaPlusCircle />
      </button>
    </Container>
  );
}
