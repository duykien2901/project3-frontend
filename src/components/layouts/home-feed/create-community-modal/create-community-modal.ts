import styled  from 'styled-components';
import { Modal } from "antd";

export const CreateCommunityModalWrapper = styled(Modal)`
  .ant-modal {
    padding: 0;
  }
  .ant-modal-content {
    .ant-modal-close-x {
      top: 16px;
      right: 20px;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 4px;
      svg {
        color: var(--fds-gray-50);
      }
      &:hover {
        background-color: var(--fds-gray-20);
      }
    }
  }
  .community-field {
    margin-bottom: 12px;
    label {
      margin-bottom: 4px;
      .text {
        font-weight: 500;
      }
      .star {
        padding-left: 4px;
        color: var(--notification-badge);
      }
    }
    .input-field {
      outline: none;
      border: 1px solid var(--fds-gray-20);
      padding: 4px 8px;
    }
    .textarea-field {
      outline: none;
      border: 1px solid var(--fds-gray-20);
      padding: 4px 8px;
      resize: none;
    }
  }
  .community-setting {
    .title {
      margin: 24px 0 16px 0;
      .text {
        font-weight: 700;
        font-size: 16px;
      }
    }
  }

`;
