import styled from "styled-components";

export const ProfileUserWrapper = styled.div`
  .header-container {
    width: 100%;
    margin-top: 30px;
    .profile-info {
      width: 100%;
      .content {
        width: 80%;
        .avatar {
          width: 72px;
          height: 72px;
        }
        .text {
          font-weight: 700;
          font-size: 24px;
        }
      }
      .follow {
        width: 20%;
      }
    }
  }
`;