import styled from "styled-components";

export const CommunityLeftWrapper = styled.div`
  .left-sidebar {
    position: relative;
    box-sizing: border-box;
    padding: 30px 16px 0 26px;
    .simplebar-content {
      position: fixed;
      .main-section {
        padding-bottom: 32px;
      }
      .communities-section {
        .title {
          font-weight: 700;
          margin-bottom: 8px;
        }
        .main-content {
          .community-item {
            @extend .feature-item;
          }
        }
      }
    }
  }
`;
