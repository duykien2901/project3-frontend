import { Spin } from "antd";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PublicRoute from "src/components/commom/public-route";
import ForgotPasswordWrapper from "src/components/forgot";
import useUser from "src/ducks/user/hook";
// import DashBoard from "./components/modules/dashboard/dashboard";
import Layout from "./components/layouts";
import Verify from "./components/verify";
// import Picker from "emoji-picker-react";
import HomeFeed from "./components/layouts/home-feed";
import ProfileUser from "./components/layouts/home-feed/posts/ProfileUser/ProfileUser";
import PostHomeFeed from "./components/layouts/home-feed/posts";
import ProfileCommunity from "./components/layouts/home-feed/posts/ProfileCommunity/ProfileCommunity";
import PrivateRoute from "./components/commom/private-route";

const LoginPage = lazy(() => import("src/components/login"));
const SignUpPage = lazy(() => import("src/components/signup"));

const Routes = () => {
  const { reAuth } = useUser();

  useEffect(() => {
    reAuth();
  }, [reAuth]);

  const BaseHomeFeedRoute = () => {
    return (
      <HomeFeed>
        <Switch>
          <Route path={"/user/:userId"}>
            <ProfileUser />
          </Route>
          <Route path={"/community/:communityId"}>
            <ProfileCommunity />
          </Route>
          <Route path={"/"}>
            <PostHomeFeed />
          </Route>
        </Switch>
      </HomeFeed>
    );
  };
  return (
    <Switch>
      {/* <PublicRoute exact path="/login">
        <LoginPage />
      </PublicRoute>
      <PublicRoute exact path="/signup">
        <SignUpPage />
      </PublicRoute> */}
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/signup">
        <SignUpPage />
      </Route>
      <Route path="/verify">
        <Verify />
      </Route>
      <Route exact path="/forgot">
        <ForgotPasswordWrapper />
      </Route>
      <PrivateRoute path={["/home", "/"]}>
        <Layout>
          <Switch>
            <Route path={["/home", "/"]}>{BaseHomeFeedRoute()}</Route>
          </Switch>
        </Layout>
      </PrivateRoute>
    </Switch>
  );
};

const AppRoute: React.FC = () => (
  <Router>
    <Suspense fallback={<Spin />}>
      <Routes />
    </Suspense>
  </Router>
);
export default AppRoute;
