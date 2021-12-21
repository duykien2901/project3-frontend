import { Modal } from "antd";
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  background: #f0f2f5;
`;

export const HeaderWrapper = styled.div`
  background: #fff;
  box-shadow: rgb(0 0 0 / 13%) 0px 1.6px 3.6px 0px,
    rgb(0 0 0 / 11%) 0px 0.3px 0.9px 0px;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .header-contain {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    .logo {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      cursor: pointer;

      img {
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .header-right {
      display: flex;
      .notification {
        height: 42px;
        width: 42px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e4e6eb;
        margin-right: 20px;
        cursor: pointer;
        img {
          width: 25px;
        }

        .ant-badge-count {
          top: -6px;
          right: -10px;
        }
      }

      .avatar {
        cursor: pointer;
        display: flex;
        align-items: center;
        .avatar-img {
          margin-right: 10px;
        }
      }
    }
  }
`;

export const ModalUserWrapper = styled(Modal)`
  .profile-image {
    height: 100%;
    .text-profile {
      display: flex;
      justify-content: center;
    }
    .ant-upload-picture-card-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80%;
      .ant-upload {
        width: 150px;
        height: 150px;
        margin: 0;

        img {
          object-fit: cover;
          width: inherit;
          height: inherit;
        }
      }
    }
  }

  .account-infor {
    padding: 10px;
    padding-right: 20px;
    .title {
      font-size: 18px;
      font-weight: 600;
    }
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      button {
        border-radius: 5px;
      }
    }
  }
`;

export const ModalChangeWrapper = styled(Modal)`
  .submit-btn {
    display: flex;
    justify-content: center;
  }
`;
