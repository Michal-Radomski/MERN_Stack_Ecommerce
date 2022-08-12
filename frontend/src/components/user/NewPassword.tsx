import React from "react";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {History} from "history";

import MetaData from "../layouts/MetaData";
import {resetPassword, clearErrors} from "../../redux/actions/userActions";

const NewPassword = ({history, match}: {history: History; match: {params: {token: string}}}): JSX.Element => {
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  console.log({history});
  console.log({match});

  const alert = useAlert();
  const dispatch: Dispatch = useDispatch();

  const {error, success} = useSelector((state: State) => state.forgotPassword);

  React.useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password updated successfully");
      history.push("/login");
    }
  }, [dispatch, alert, error, success, history]);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match.params.token, formData));
  };

  return (
    <React.Fragment>
      <MetaData title={"New Password Reset"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

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

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>

            <button id="new_password_button" type="submit" className="btn btn-block py-3">
              Set Password
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewPassword;
