import styled from "styled-components";

export const CommunityCardWrapper = styled.div`
  margin-top: 8px;
  .close-container {
    .btn-close {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      padding: 0;
      .icon {
        width: 18px;
        height: 18px;
      }
      &:hover {
        background-color: var(--fds-gray-10);
      }
    }
  }
  .container {
    margin-left: 8px;
    .avatar {
      width: 72px;
      height: 72px;
    }
    .content-container {
      .community-name {
        font-weight: 700;
        height: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 150px;
        font-size: 13px;
      }
      .community-member {
        font-size: 13px;
        font-style: italic;
        height: 16px;
      }
    }
    .footer {
      height: calc(100% - 32px);
      .btn-join {
        padding: 5px 24px;
        height: 32px;
        border: 1px solid var(--fds-blue-40);
        border-radius: 20px;
        .text-button {
          font-weight: 600;
          color: var(--fds-blue-60);
        }
        &:hover {
          background-color: var(--fds-gray-10);
        }
      }
    }
  }
  .line {
    margin-top: 20px;
    height: 2px;
    width: 100%;
    background-color: var(--fds-gray-10);
  }
`;
