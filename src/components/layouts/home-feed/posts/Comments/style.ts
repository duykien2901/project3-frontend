import styled from "styled-components";

export const CommemtWrapper = styled.div`
  .comment-input {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    .input-wrapper {
      width: 100%;
      height: auto;
      min-height: 45px;
      padding: 5px 0;
      border-radius: 13px;
      background-color: #f0f2f5;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .ant-form-item {
        margin-bottom: 0;
        width: 70%;

        .ant-mentions {
          border: none !important;
          font-size: 15px;
          textarea {
            background-color: #f0f2f5;
            padding: 5px 0;
          }
          :hover {
            border: none !important;
          }
        }

        .ant-mentions-focused {
          border: none !important;
          box-shadow: none;
        }
      }
      .upload {
        height: 70%;
        display: flex;
        justify-content: center;
        align-items: center;
        .ant-upload {
          border: none;
          background-color: #f0f2f5;
          margin: 0;
          height: 30px;
          width: 30px;
        }
        img {
          height: 22px;
          margin-left: 15px;
          cursor: pointer;
        }
      }
    }
  }
  .cancel {
    padding-left: 50px;
    .cancel-item {
      color: #5687c9;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
    }
  }

  .img-preview {
    width: 100%;
    height: 100px;
    position: relative;
    padding-left: 45px;
    margin: 10px 0;
    .img-item {
      border: 0.1px solid #e2e2e2;
      height: inherit;
      border-radius: 18px;
    }
    .close-btn {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      background-color: #e8e8e8;
      align-items: center;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      :hover {
        background-color: #d3d3d3;
      }
      img {
        width: 15px;
        height: 15px;
      }
    }
  }
`;

export const CommentDetailWrapper = styled.div`
  margin: 15px 0 30px;
  display: flex;
  align-items: flex-start;

  .content-wrapper {
    width: 100%;
  }

  .content-comment {
    font-size: 16px;
    white-space: pre-line;
    padding: 8px 12px;
    border-radius: 20px;
    background-color: #f0f2f5;
    display: inline-block;
    position: relative;

    .edit-btn {
      font-size: 20px;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: -60px;
      display: none;
      .icon-edit {
        width: 35px;
        height: 35px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;

        :hover {
          background-color: #dfdfdf;
        }
      }
    }

    .link-profile {
      font-weight: 600;
      color: #000;
      :hover {
        text-decoration: underline;
      }
    }
    /* width: 100%; */
  }
  .img-comments {
    width: auto;
    height: 230px;
    border-radius: 18px;
    display: inline-block;
    margin-top: 2px;

    .ant-image {
      height: inherit;
      width: auto;
      cursor: pointer;
      .ant-image-mask {
        display: none;
      }
      img {
        height: inherit;
        width: auto;
        border-radius: 18px;
        border: 0.1px solid #e2e2e2;
      }
    }
  }
  .reaction-comments {
    padding: 2px 12px;
    font-size: 13px;
    font-weight: 550;
    color: #5d5d5d;
    .reaction-item {
      cursor: pointer;
      margin-right: 10px;
    }
  }

  :hover .edit-btn {
    display: block;
  }
  .more-reply {
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    color: #5d5d5d;
    margin: 10px 0;
    .img-reply {
      transform: rotate(180deg);
    }
  }
`;
