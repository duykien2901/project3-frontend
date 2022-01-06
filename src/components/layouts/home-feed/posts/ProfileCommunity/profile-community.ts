import styled from "styled-components";

export const ProfileCommunityWrapper = styled.div`
  border-radius: 4px;
  background-color: var(--fds-white);
  box-shadow: 0 3px 3px var(--fds-gray-20);
  .cover-background {
    width: 100%;
    height: 275px;
    margin-top: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .space {
    position: relative;
    height: 30px;
    .avatar {
      width: 120px;
      height: 120px;
      position: absolute;
      top: -90px;
      left: 24px;
      border-radius: 20px;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  .footer {
    width: 100%;
    .footer-title {
      width: 100%;
      .title {
        width: 80%;
        height: 48px;
        .text {
          font-weight: 700;
          font-size: 24px;
          margin-left: 24px;
        }
      }
      .toolbar {
        width: 20%;
        padding: 0 16px 4px 0;
        .btn {
          height: 20px;
          width: 20px;
          border: 1px solid var(--fds-gray-25);
          border-radius: 2px;
        }
        .btn-more {
          margin-left: 4px;
        }
        .btn-more,
        .btn-like {
          &:hover {
            background-color: var(--fds-gray-10);
          }
        }
      }
    }
    .footer-tab {
      height: 44px;
      margin-top: 4px;
      padding: 0 16px;
      .tab-item {
        height: 100%;
        position: relative;
        cursor: pointer;
        .title {
          height: calc(100% - 3px);
          width: 100%;
          font-weight: 500;
          padding: 0 8px;
        }
        &.actived {
          .line {
            height: 3px;
            background-color: var(--base-blue);
            position: absolute;
            bottom: 0;
            transition: left 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9),
              right 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9);
            left: 8px;
            right: 8px;
          }
        }

        &:hover {
          &.actived {
            .line {
              left: 0px;
              right: 0px;
            }
          }
          .title {
            background-color: var(--fds-gray-10);
            border-radius: 4px;
          }
        }
      }
    }
  }
`;
