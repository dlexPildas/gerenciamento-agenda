import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 100px;
`;

export const ListUsers = styled.ul`
  flex: 1;
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
      text-align: center;
      flex: 1;
    }
  }
`;

export const SideLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;

export const SideRigth = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;
