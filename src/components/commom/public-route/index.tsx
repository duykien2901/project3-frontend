import { Redirect, Route, RouteProps } from "react-router-dom";
import useUser from "src/ducks/user/hook";

const PublicRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { loggedUser } = useUser();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return !loggedUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: (location as any)?.state?.from?.pathname || "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default PublicRoute;