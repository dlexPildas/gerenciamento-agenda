import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;
export const ContainerEvents = styled.div`
  width: 100%;
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

    strong,
    span {
      flex: 1;
    }

    svg {
      cursor: pointer;
      &:hover {
        transform: translateY(-2px);
      }
    }
  }
`;

export const Subscribed = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContainerForm = styled.div`
  width: 100%;
  margin: 40px 50px;
`;
