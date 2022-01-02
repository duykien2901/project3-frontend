import styled from "styled-components";

export const BaseFeatureWrapper = styled.div`
  .feature-item {
    cursor: pointer;
    .feature-content {
      height: 36px;
      padding: 8px;
      border-radius: 20px;
      border: 2px solid var(--always-gray-95);
      &:hover {
        background-color: var(--fds-gray-00);
        border: 2px solid var(--fds-gray-25);
      }
      &.actived {
        background-color: var(--fds-gray-10);
        border: 2px solid var(--fds-gray-25);
        .feature-name {
          font-weight: 700;
        }
      }
    }
  }
`;