import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  h5 {
    margin-left: 5px;
    background: #fff;
    padding: 5px;
    border-radius: 10px;
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
  }
`;

export const Subscribed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
