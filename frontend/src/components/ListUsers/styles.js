import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px;
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  h5 {
    margin-left: 5px;
    background: #fff;
    padding: 5px;
    border-radius: 10px;
  }
`;

export const ListUsers = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  font-size: 10px;
  font-weight: bold;

  li {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #2e74b9;
    color: #fff;
    padding: 10px;
    border-radius: 10px;

    strong,
    span {
    }
  }

  h3 {
    text-align: center;
    flex: 1;
    margin: 30px;
    background: #666;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
  }
`;

export const Action = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    margin: 0 5px;
    cursor: pointer;
    &:hover {
      transform: translateY(-2px);
    }
  }
`;

export const Voltar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    border-radius: 5px;
    padding: 5px;
    color: #666;
  }
`;
