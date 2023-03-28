import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../LoadingError/Error";
import Toast from "./../LoadingError/Toast";
import Loading from "./../LoadingError/Loading";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Actions/userActions";

const ProfileTabs = () => {
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastId = React.useRef(null);

  const Toastobjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading: updateLoading } = userUpdateProfile;

  const submitHandler = (e) => {
    e.preventDefault();
    // Password match
    if (password !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", Toastobjects);
      }
    } else {
      dispatch(updateUserProfile({ id: user._id, oldPassword, password }));
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile Updated", Toastobjects);
        setPassword("");
        setConfirmPassword("");
      }
    }
  };
  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />}
      {updateLoading && <Loading />}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-12">
          <h3>Đổi mật khẩu</h3>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Mật khẩu cũ</label>
            <input
              className="form-control"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>
        <div></div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Mật khẩu mới</label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Xác nhận mật khẩu</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <button type="submit">CẬP NHẬT</button>
      </form>
    </>
  );
};

export default ProfileTabs;
