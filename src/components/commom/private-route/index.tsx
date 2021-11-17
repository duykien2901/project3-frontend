import { Redirect, Route, RouteProps } from "react-router-dom";
import useUser from "src/ducks/user/hook";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { loggedUser } = useUser();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return loggedUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
