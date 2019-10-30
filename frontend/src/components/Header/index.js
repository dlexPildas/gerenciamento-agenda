import React from "react";

import { FaSignOutAlt } from "react-icons/fa";

import { Container } from "./styles";

export default function Header() {
  return (
    <Container>
      <nav>
        <span>Home</span>
        <span>Eventos</span>
      </nav>
      <FaSignOutAlt size={25} />
    </Container>
  );
}
