import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  .header {
    width: 140px;
    margin-top: 5px;
    .user-setting {
      color: rgb(55 55 55 / 85%);
      font-size: 15px;
      height: 40px;
      img {
        width: 20px;
      }
    }
  }

`;
