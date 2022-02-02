import { Modal } from "antd";
import styled from "styled-components";

export const PostHomeFeedWrapper = styled.div`
  /* height: 60vh;
  overflow: auto; */
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
      height: 35px;
      display: flex;
      .upload {
        font-size: 17px;
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

  .spin {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    span {
      font-size: 28px;
      color: #7c6ce9;
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
  padding: 20px 25px 10px;

  .readMore {
    font-size: 16px;
    padding: 4px 0;
    font-weight: 600;
    color: #4a4a4a;
    cursor: pointer;
    margin-bottom: 5px;
  }

  .total {
    height: 30px;
    display: flex;
    align-items: center;

    .total-reactions {
      display: flex;
      align-items: center;
      .reactions-item {
        margin-right: 2px;
        img {
          height: 20px;
        }
      }
      .reactions-length {
        margin-left: 7px;
        font-size: 16px;
      }
    }
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #ced0d4;
    margin: 10px 0;
  }

  .reaction {
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .reaction-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 30%;
      font-size: 16px;
      font-weight: 600;
      border-radius: 7px;
      :hover {
        background-color: #eeeeee;
      }
      cursor: pointer;
      img {
        cursor: pointer;
        height: 60%;
        margin-right: 5px;
      }
    }
  }

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
          display: flex;
          justify-content: flex-start;
          align-items: center;

          span {
            color: #808080;
            display: flex;
            align-items: center;
            img {
              margin-left: 5px;
              width: 18px;
              height: auto;
            }
          }
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
    margin-bottom: 30px;
    font-size: 18px;
    white-space: pre;
    a {
      white-space: normal;
    }
  }

  .img-content {
    margin-bottom: 30px;
    .slick-prev,
    .slick-next {
      width: 40px;
      height: 40px;
      background-color: #cfcfcfcc;
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
    .slick-prev {
      left: -15px;
    }
    .slick-next {
      right: -15px !important;
    }

    .slick-slide {
      height: 500px;
      .ant-image {
        width: 100%;
      }
      div {
        height: inherit;
        cursor: pointer;
        img {
          object-fit: contain;
          height: inherit;
        }
      }
    }
    .ant-image-mask {
      display: none;
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
