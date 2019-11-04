import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  input {
    border-radius: 10px;
    border: 0;
    padding: 5px;
    color: #666;
    font-weight: bold;
    padding-left: 10px;
  }
`;

export const ListEvent = styled.ul`
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

    strong {
      flex: 1;
    }

    span {
      flex: 1;
      display: flex;
      align-items: center;
    }
  }
`;

export const Dates = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const DateEvent = styled.span`
  width: 60%;
  display: flex;
  justify-content: center;
  background: #666;
  border-radius: 5px;
  margin: 2px 0;
  padding: 2px 0;
`;

export const Action = styled.div`
  display: flex;
  align-items: center;

  div {
    svg {
      cursor: pointer;
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
`;

export const ButtonParticipate = styled.button`
  margin-left: 50px;
  display: flex;
  justify-content: center;
  background: transparent;
  border: 0;
  color: #fff;
  background: #5b5e5d;
  border-radius: 5px;
  font-weight: bold;
  font-size: 10px;
  padding: 5px;

  span {
    margin-left: 5px;
  }
`;
