import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginComponent = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Logo = styled.img`
  width: 250px;
  height: 200px;
  margin-bottom: 20px;
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

export const ButtonLogin = styled.button`
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
`;
