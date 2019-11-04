import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 100px;
`;

export const Info = styled.div`
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
  flex-direction: column;
  justify-content: space-between;
  padding: 0 30px;
`;

export const SideRigth = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 10px;
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
  margin-top: 30px;

  button {
    border-radius: 5px;
    padding: 5px;
    color: #666;
  }
`;
