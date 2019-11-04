import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  /* margin-left: 100px; */
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

export const Dates = styled.div`
  margin: 10px 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  label {
    display: flex;
    flex-direction: column;

    span {
      width: 50%;
      border: 2px solid #666;
      border-bottom: 0;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      color: #666;
      padding-left: 10px;
      font-weight: bold;
      font-size: 10px;
    }
    input {
      border: 2px solid #666;
      border-radius: 10px;
      border-top-left-radius: 0;
      margin-bottom: 0px;
      color: #666;
      font-size: 12px;
    }
  }
`;
