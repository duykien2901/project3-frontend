import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PublicRoute from "src/components/commom/public-route";
import useUser from "src/ducks/user/hook";

const LoginPage = lazy(() => import("src/components/login"));

const Routes = () => {
  const { reAuth } = useUser();
  useEffect(() => {
    reAuth();
  }, [reAuth]);

  return (
    <Switch>
      <PublicRoute exact path="/login">
        <LoginPage />
      </PublicRoute>
    </Switch>
  );
};

const AppRoute: React.FC = () => (
  <Router>
    <Suspense fallback={null}>
      <Routes />
    </Suspense>
  </Router>
);
export default AppRoute;
