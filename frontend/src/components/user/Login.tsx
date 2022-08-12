import React from "react";
import {Link} from "react-router-dom";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {History, Location} from "history";

import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import {login, clearErrors} from "../../redux/actions/userActions";

const Login = ({history, location}: {history: History; location: Location}): JSX.Element => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const alert = useAlert();
  const dispatch: Dispatch = useDispatch();

  const {isAuthenticated, error, loading} = useSelector((state: State) => state.auth);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  React.useEffect(() => {
    if (isAuthenticated) {
      // history.push("/");
      history.push(redirect);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, dispatch, error, history, isAuthenticated, redirect]);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <MetaData title={"Login"} />

          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <br />
                <Link to="password/forgot" style={{float: "right"}}>
                  Forgot Password?
                </Link>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  style={{width: "100%", marginTop: "2rem", marginBottom: "2rem"}}
                >
                  LOGIN
                </button>
                <br />
                <Link to="/register" style={{float: "right"}}>
                  New User?
                </Link>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Login;
