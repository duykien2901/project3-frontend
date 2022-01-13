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
`;

export const CommentDetailWrapper = styled.div`
  margin: 15px 0 30px;
  display: flex;
  align-items: flex-start;

  .content-comment {
    font-size: 16px;
    white-space: pre-line;
    padding: 8px 12px;
    border-radius: 20px;
    background-color: #f0f2f5;

    .link-profile {
      font-weight: 600;
      color: #000;
      :hover {
        text-decoration: underline;
      }
    }
    /* width: 100%; */
  }
`;
