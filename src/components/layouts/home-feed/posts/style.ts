import { Modal } from "antd";
import styled from "styled-components";

export const PostHomeFeedWrapper = styled.div`
  .post-create {
    width: 100%;
    background: #fff;
    box-shadow: rgb(0 0 0 / 13%) 0px 1.6px 3.6px 0px,
      rgb(0 0 0 / 11%) 0px 0.3px 0.9px 0px;
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    padding: 20px 25px;

    .feeling {
      display: flex;
      justify-content: space-between;
      .avatar {
        border-radius: 50%;
        border: 0.5px solid #b1b1b1;
        cursor: pointer;
      }
      .content {
        background-color: #f0f2f5;
        width: 90%;
        border-radius: 25px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 10px 20px;
        font-size: 20px;
        color: #7e7e7e;
        cursor: pointer;
        :hover {
          background-color: #dfdfdf;
        }
      }
    }

    .line {
      width: 100%;
      height: 1px;
      background-color: #e7e7e7;
      margin: 20px 0;
    }

    .upload-content {
      height: 50px;
      display: flex;
      .upload {
        font-size: 19px;
        color: #969696;
        font-weight: 600;
        display: flex;
        align-items: center;
        height: inherit;
        margin-right: 30px;
        padding: 20px 20px;
        border-radius: 15px;
        cursor: pointer;
        img {
          height: 35px;
          margin-right: 10px;
        }
      }
      .upload:hover {
        background-color: #f0f2f5;
      }
    }
  }
`;

export const PostDetailWrapper = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: rgb(0 0 0 / 13%) 0px 1.6px 3.6px 0px,
    rgb(0 0 0 / 11%) 0px 0.3px 0.9px 0px;
  margin-bottom: 30px;
  border-radius: 10px;
  padding: 20px 25px;

  .title {
    display: flex;
    justify-content: space-between;

    .author {
      display: flex;
      .avatar {
        margin-right: 15px;
        border-radius: 50%;
        border: 0.5px solid #b1b1b1;
        cursor: pointer;
      }
      .auth-name {
        display: flex;
        flex-direction: column;
        .name {
          font-size: 16px;
          font-weight: 600;
        }
        .time {
        }
      }
    }

    .edit-btn {
      font-size: 25px;
      cursor: pointer;
      .icon-edit {
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        :hover {
          background-color: #dfdfdf;
        }
      }
    }
  }

  .content {
    margin-top: 10px;
    font-size: 18px;
  }

  .img-content {
    .slick-prev,
    .slick-next {
      width: 40px;
      height: 40px;
      background-color: #f0f2f5;
      color: #818181;
      z-index: 1000;
      border-radius: 50%;
      display: flex !important;
      justify-content: center;
      align-items: center;

      :hover {
        background-color: #f0f2f5;
      }

      svg {
        width: 40%;
        height: 40%;
      }
    }
  }
`;

export const PostModalWrapper = styled(Modal)`
  .ant-modal-content {
    .ant-modal-body {
      padding-right: 0;
    }
    .author {
      display: flex;
      .avatar {
        margin-right: 15px;
        border-radius: 50%;
        cursor: pointer;
        span {
          border: 0.5px solid #b1b1b1;
        }
      }
      .auth-name {
        display: flex;
        flex-direction: column;
        .name {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .modeHide {
          .ant-select-selector {
            font-size: 15px;
            font-weight: 600;
            border-radius: 6px;
            background-color: #e4e6eb;
            border: none;
            width: 130px;
          }
          .ant-select-arrow {
            right: 0;
          }
        }
      }
    }

    .content-wrapper {
      max-height: 50vh;
      overflow-y: auto;
      padding-right: 14px;
      ::-webkit-scrollbar {
        width: 10px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: #fff;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #7c7c7cd9;
        border-radius: 5px;
      }

      :hover ::-webkit-scrollbar-thumb {
        background: #e4e6eb;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #888;
      }

      .ant-mentions {
        border: none !important;
        :hover {
          border: none !important;
        }
      }

      .ant-mentions-focused {
        border: none !important;
        box-shadow: none;
      }

      .img-preview {
        width: 100%;
        margin: 25px 0;
        border: 1px solid #ced0d4;
        border-radius: 10px;
        position: relative;
        img {
          width: 100%;
          height: inherit;
          object-fit: contain;
          border-radius: 10px;
        }
        .close-btn {
          display: inline;
          position: absolute;
          top: 15px;
          right: 15px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid #ced0d4;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          :hover {
            background-color: #dbdbdb;
          }
        }
      }
    }

    .btn-icon {
      margin: 30px 0 20px 0;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      border: 1px solid #ced0d4;
      border-radius: 12px;
      margin-right: 24px;
      padding: 10px 20px;

      .icon {
        display: flex;
        align-items: center;
        .ant-upload {
          border: none;
          background-color: #fff;
          margin: 0;
          height: auto;
        }
      }
      .title-add {
        font-size: 17px;
        font-weight: 600;
      }
      img {
        height: 30px;
        margin-left: 15px;
        cursor: pointer;
      }
    }

    textarea {
      font-size: 24px;
      color: #000;
      white-space: pre-line;
    }

    .btn-submit {
      display: flex;
      justify-content: center;
      button {
        width: 70%;
        font-size: 17px;
        font-weight: 600;
        border-radius: 8px;
      }
    }
  }
`;
