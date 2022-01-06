import styled from "styled-components";

export const BaseButtonWrapper = styled.div`
  .btn {
    padding: 4px 12px;
    .text {
      margin-left: 8px;
    }
  }
  .btn-dark {
    background: var(--always-black);
    border-radius: 2px;
    .text {
      color: var(--fds-white);
      font-weight: 600;
    }
  }
  .btn-blue {
    &:hover {
      .text {
        color: var(--fds-blue-60);
        text-decoration: underline solid var(--fds-blue-40);
      }
    }
  }
  .btn-blue-2 {
    padding: 4px 0;
    .text {
      font-size: 13px;
      font-weight: 500;
    }
    &:hover {
      .text {
        color: var(--fds-blue-60);
        text-decoration: underline solid var(--fds-blue-40);
      }
    }
  }
`;
