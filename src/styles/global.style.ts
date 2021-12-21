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

  .ant-modal {

    .ant-modal-close-x {
      border-radius: 50%;
      background: #272727;
      position: absolute;
      top: -32px;
      right: -32px;
      opacity: 0.5;
  
      svg {
        color: #fff;
      }
    }
    .ant-modal-content {
      border-radius: 15px;
      .ant-modal-header {
        border-radius: 15px;
      }
    }

    .ant-btn {
      border-radius: 5px;
      box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 5%), 0px 2px 2px 0px rgb(0 0 0 / 5%), 0px 1px 5px 0px rgb(0 0 0 / 5%);
    }

    .ant-input, .ant-input-password {
      border-radius: 7px;
    }

  }  
`;
