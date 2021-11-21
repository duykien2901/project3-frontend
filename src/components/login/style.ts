import styled from "styled-components";
import background from "src/assets/img/background-img.jpg";

export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-image: url(${background});
  background-size: cover;

  .login-page {
    width: 460px;
    padding: 10px 30px;
    margin: 0 auto;
    text-align: center;
    .login-page-body {
      .login-form {
        font-size: 14px;
        padding: 60px 40px 40px;
        background: #fff;
        box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%),
          0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
        border-radius: 10px;
        position: relative;
        height: 100%;

        input {
          border-radius: 5px;
        }

        .ant-input-password {
          border-radius: 5px;
        }

        label {
          font-size: 16px;
        }

        .login-title {
          font-size: 32px;
          font-weight: 500;
          margin-bottom: 40px;
        }

        .btn-login {
          border-radius: 5px;
          width: 100%;
          margin-top: 20px;
          background-color: #4259ac;
        }
        .link-signup {
          display: flex;
          justify-content: center;
          margin-top: 15px;
          a {
            font-size: 14px;
            font-weight: 600;
            color: #4259ac;
          }
        }
      }
    }
  }
`;
