import styled from "styled-components";

export const Container = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

  nav {
    display: flex;

    span {
      cursor: pointer;
      color: #56595d;
      border: 4px solid #eee;
      border-radius: 10px;
      font-size: 20px;
      margin-left: 100px;
      padding: 10px 30px;

      &:hover {
        border-bottom-color: #2e74b9;
      }
    }
  }

  svg {
    cursor: pointer;
    &:hover {
      transform: translateY(-5px);
    }
  }
`;
