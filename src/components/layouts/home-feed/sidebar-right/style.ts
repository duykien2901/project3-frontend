import styled from "styled-components";

export const SidebarRightWrapper = styled.div`
  .right-sidebar {
    padding: 30px 16px 0 16px;
    .main-content {
      padding: 16px 24px 24px 24px;
      border-radius: 4px;
      border: 1px solid var(--fds-gray-20);
      width: 70%;
      height: fit-content;
      background-color: #ffffff;
      min-width: 288px;
      .title {
        font-weight: 700;
      }
      .break-line {
        margin-top: 12px;
        height: 2px;
        background-color: var(--fds-gray-10);
      }
    }
  }
`;