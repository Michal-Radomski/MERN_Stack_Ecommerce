import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({isAdmin, component: Component, ...rest}: any): JSX.Element => {
  const {isAuthenticated, loading, user} = useSelector((state: State) => state.auth);

  // console.log({rest});

  return (
    <React.Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }

            if (isAdmin === true && user.role !== "admin") {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
