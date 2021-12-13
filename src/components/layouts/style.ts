import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  background: #f0f2f5;
`;

export const HeaderWrapper = styled.div`
  background: #fff;
  box-shadow: rgb(0 0 0 / 13%) 0px 1.6px 3.6px 0px,
    rgb(0 0 0 / 11%) 0px 0.3px 0.9px 0px;
  height: 70px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  .header-contain {
    .logo {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      cursor: pointer;

      img {
        height: 50px;
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  }
`;
