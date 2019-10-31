import React from "react";

import { FaCalendarPlus, FaPlusCircle } from "react-icons/fa";

import { Container, Title } from "./styles";

export default function FormEvents() {
  return (
    <Container>
      <Title>
        <FaCalendarPlus />
        <h5>Crie um novo evento!</h5>
      </Title>

      <input type="text" name="nome" placeholder="nome" />
      <input type="text" name="description" placeholder="descrição" />
      <input type="date" name="date_event" placeholder="data" />
      <input type="text" name="place" placeholder="local" />

      <button>
        <FaPlusCircle />
      </button>
    </Container>
  );
}
