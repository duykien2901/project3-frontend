import { Spin } from "antd";
import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoute from "src/components/commom/public-route";
import ForgotPasswordWrapper from "src/components/forgot";
import useUser from "src/ducks/user/hook";
import DashBoard from "./components/modules/dashboard/dashboard";
import Layout from "./components/layouts";
import Verify from "./components/verify";

const LoginPage = lazy(() => import("src/components/login"));
const SignUpPage = lazy(() => import("src/components/signup"));

const Routes = () => {
  const { reAuth } = useUser();
  useEffect(() => {
    reAuth();
  }, [reAuth]);

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
      <Route exact path="/verify">
        <Verify />
      </Route>
      <Route exact path="/forgot">
        <ForgotPasswordWrapper />
      </Route>
      <Route path={["/home", "/"]}>
        <Layout>
          <Switch>
            <Route path="/home">
              <div></div>
            </Route>
          </Switch>
        </Layout>
      </Route>
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