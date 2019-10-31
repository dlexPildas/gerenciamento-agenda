import React from "react";

import { Link } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

import { Container } from "./styles";

import { logout } from "../../services/auth";

export default function Header() {
  return (
    <Container>
      <nav>
        <span>Home</span>
        <span>Eventos</span>
      </nav>
      <Link to="/">
        <button onClick={() => logout()}>
          <FaSignOutAlt size={25} />
        </button>
      </Link>
    </Container>
  );
}
