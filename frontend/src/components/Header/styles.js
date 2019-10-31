import styled, { css } from "styled-components";

export const Container = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

  nav {
    display: flex;
  }

  button {
    margin-right: 100px;
    background: transparent;
    border: 0;
  }

  svg {
    border-radius: 10px;
    border: 2px solid #eee;
    padding: 2px;
    cursor: pointer;
    &:hover {
      transform: translateY(-5px);
    }
  }
`;

export const Span = styled.span.attrs({})`
  cursor: pointer;
  border: 4px solid #eee;
  border-radius: 10px;
  font-size: 20px;
  margin-left: 100px;
  padding: 10px 1px;
  a {
    flex: 1;
    padding: 10px 30px;
    color: #56595d;
    text-decoration: none;
  }

  ${props =>
    props.page &&
    css`
      border-bottom-color: #2e74b9;
    `}

  &:hover {
    border-bottom-color: #2e74b9;
  }

  @media (max-width: 900px) {
    font-size: 58%;
  }
`;
