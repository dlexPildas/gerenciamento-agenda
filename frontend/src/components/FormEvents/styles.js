import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 900px) {
    margin-right: 50px;
  }
  input {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    height: 48px;
    border: 0;
    border-radius: 5px;
    color: #222;
    font-weight: bold;
    font-size: 14px;
    background: #eee;

    @media (max-width: 900px) {
      font-size: 58%;
      height: 28px;
    }

    ::-webkit-input-placeholder {
      font-size: 14px;
      color: #999;
    }
  }

  button {
    width: 100%;

    padding: 10px;
    height: 48px;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    font-size: 19px;
    background: #2e74b9;

    &:hover {
      background: #86c1e7;
      color: #fff;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  svg {
    margin-right: 5px;
  }

  h5 {
    background: #eee;
    padding: 5px;
    border-radius: 10px;
  }
`;