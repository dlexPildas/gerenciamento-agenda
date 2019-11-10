import styled, { css, keyframes } from "styled-components";

const form = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginComponent = styled.div`
  height: 100%;
  width: 30%;
  display: ${props => (props.register === 0 ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation-name: ${form};
  animation-duration: 1s;
`;

export const RegisterUser = styled.div.attrs({})`
  height: 100%;
  width: 30%;
  display: ${props => (props.register === 1 ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;

  animation-name: ${form};
  animation-duration: 1s;

  h1 {
    width: 100%;
    font-size: 25px;
    text-align: start;
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    color: #666;
  }
`;

export const Logo = styled.img`
  width: 250px;
  height: 200px;
  margin-bottom: 20px;
`;

export const Error = styled.span`
  width: 100%;
  text-align: start;
  color: red;
  padding: 5px;
  font-weight: bold;
  font-size: 11px;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  height: 48px;
  border: 0;
  border-radius: 5px;
  color: #999;
  font-weight: bold;
  font-size: 19px;
  background: #eee;

  ::-webkit-input-placeholder {
    color: #999;
  }
`;

export const Button = styled.button.attrs({})`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  height: 48px;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  font-size: 19px;
  background: ${props => (props.color ? props.color : "#2e74b9")};

  &:hover {
    background: #86c1e7;
    color: #fff;
  }
`;

export const Actions = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;

  span {
    flex: 1;
    text-align: end;

    a {
      color: #3176ba;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }
  }
`;
