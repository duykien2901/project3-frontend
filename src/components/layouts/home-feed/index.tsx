import { Col } from "antd";
import React from "react";
import PostHomeFeed from "./posts";
import { HomeFeedWrapper } from "./style";

const HomeFeed: React.FC = () => {
  return (
    <HomeFeedWrapper>
      <Col xl={7} lg={7} md={6}></Col>
      <Col xl={10} lg={10} md={12}>
        <PostHomeFeed />
      </Col>
      <Col xl={7} lg={7} md={6}></Col>
    </HomeFeedWrapper>
  );
};

export default HomeFeed;
