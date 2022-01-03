import { Col } from "antd";
import React from "react";
import CommunityLeft from "./sidebar-left";
import { HomeFeedWrapper } from "./style";
import SidebarRight from "./sidebar-right/sidebar-right";
import usePost from "src/ducks/home/post/hook";

const HomeFeed: React.FC = ({ children }) => {
  const { handleScrollTop } = usePost();
  // const handleScrollTop = (e: any) => {
  //   const element = e.target;
  //   if (element.scrollHeight === element.scrollTop + element.clientHeight)
  //     console.log("ss");
  // };
  return (
    <HomeFeedWrapper
      onScroll={(e) => handleScrollTop(e, window.location.pathname)}
    >
      <Col xl={7} lg={7} md={6}>
        <CommunityLeft />
      </Col>

      <Col xl={10} lg={10} md={12}>
        {children}
      </Col>

      <Col xl={7} lg={7} md={6}>
        <SidebarRight />
      </Col>
    </HomeFeedWrapper>
  );
};

export default HomeFeed;
