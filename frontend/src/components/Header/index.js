import React from "react";

import { Link } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

import { Container, Span } from "./styles";

import { logout } from "../../services/auth";

export default function Header({ page }) {
  console.log(page);

  return (
    <Container>
      <nav>
        <Span page={page === 1 && page}>
          <Link to="/main">Home</Link>{" "}
        </Span>

        <Span page={page === 2 && page}>
          <Link to="/events">Eventos</Link>
        </Span>
      </nav>
      <Link to="/">
        <button onClick={() => logout()}>
          <FaSignOutAlt size={25} color="#5b5e5d" />
        </button>
      </Link>
    </Container>
  );
}
