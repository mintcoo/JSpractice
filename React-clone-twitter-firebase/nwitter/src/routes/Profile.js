import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>LogOut</button>
    </>
  );
};

export default Profile;
