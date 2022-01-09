import styled from "styled-components";

export const CommemtWrapper = styled.div`
  .comment-input {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    .input-wrapper {
      width: 100%;
      border-radius: 10px;
      background-color: #f0f2f5;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .ant-form-item {
        margin-bottom: 0;
        width: 70%;
      }
      .upload {
        height: 70%;
        img {
          height: 22px;
          margin-left: 15px;
          cursor: pointer;
        }
      }
    }
  }
`;
