import styled from "styled-components";

export const ReplyDetailWrapper = styled.div`
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
