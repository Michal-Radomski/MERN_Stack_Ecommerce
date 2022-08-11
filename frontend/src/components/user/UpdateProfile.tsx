import React from "react";
import {History} from "history";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";

import MetaData from "../layouts/MetaData";
import {updateProfile, loadUser, clearErrors} from "../../redux/actions/userActions";
import {UPDATE_PROFILE_RESET} from "../../redux/constants/userConstants";

const UpdateProfile = ({history}: {history: History}): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [avatar, setAvatar] = React.useState<any>(
    "https://res.cloudinary.com/michas/image/upload/v1660235149/avatars/wnnnskfwz2ey1qernz3g.png"
  );
  const [avatarPreview, setAvatarPreview] = React.useState<any>(
    "https://res.cloudinary.com/michas/image/upload/v1660235149/avatars/wnnnskfwz2ey1qernz3g.png"
  );

  const alert = useAlert();
  const dispatch: Dispatch = useDispatch();

  const {user} = useSelector((state: State) => state.auth);
  const {error, isUpdated, loading} = useSelector((state: State) => state.user);

  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadUser());

      history.push("/me");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated, user]);

  const submitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  const onChange = (event: any) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(event.target.files[0]);
  };
  return (
    <React.Fragment>
      <MetaData title={"Update Profile"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
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
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img src={avatarPreview} className="rounded-circle" alt="Avatar Preview" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false}>
              Update
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdateProfile;
