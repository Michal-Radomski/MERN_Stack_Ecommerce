import React from "react";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {History} from "history";

import MetaData from "../layouts/MetaData";
import Sidebar from "./Sidebar";
import {updateUser, getUserDetails, clearErrors} from "../../redux/actions/userActions";
import {UPDATE_USER_RESET} from "../../redux/constants/userConstants";

const UpdateUser = ({history, match}: {history: History; match: {params: {id: string}}}): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [role, setRole] = React.useState<string>("");

  const alert = useAlert();
  const dispatch: Dispatch = useDispatch();

  const {error, isUpdated} = useSelector((state: State) => state.user);
  const {user} = useSelector((state: State) => state.userDetails);

  const userId = match.params.id;

  React.useEffect(() => {
    // console.log(user.name, user && user._id !== userId);
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");

      history.push("/admin/users");

      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated, userId, user]);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
  };

  return (
    <React.Fragment>
      <MetaData title={`Update User`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mt-2 mb-5">Update User</h1>

                <div className="form-group">
                  <label htmlFor="name_field">Name</label>
                  <input
                    type="name"
                    id="name_field"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role_field">Role</label>

                  <select
                    id="role_field"
                    className="form-control"
                    name="role"
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateUser;
