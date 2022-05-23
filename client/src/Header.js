import React from "react";
import { Link } from "react-router-dom";
import logo from "./resources/logo.png";

function Header({ user, onLogout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <div>
      <img
        style={{
          display: "block",
          margin: "auto",
          marginTop: 25,
          width: "30%",
        }}
        src={logo}
        alt="PIXART"
      />
      {
        user ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              margin: 10,
            }}
          >
            <Link
              to={"/login"}
              onClick={handleLogout}
              style={{ display: "block", margin: "auto", marginRight: 0 }}
            >
              Logout
            </Link>
            <Link
              to={"/leaderboard"}
              style={{ display: "block", margin: "auto" }}
            >
              Leaderboard
            </Link>
            <Link to={"profile"} style={{ display: "block", margin: "auto" }}>
              Profile
            </Link>
            <Link to={"/"} style={{ display: "block", margin: "auto" }}>
              Canvas
            </Link>

            <p
              style={{
                display: "block",
                margin: "auto",
                marginLeft: 0,
              }}
            >
              Welcome, {user.display_name ? user.display_name : user.username}!
            </p>
            <img
              src={user.avatar}
              alt="avatar"
              style={{
                width: "5%",
                padding: 10,
              }}
            ></img>
          </div>
        ) : null
        // <h1
        //   style={{
        //     display: "block",
        //     margin: "auto",
        //     marginTop: 50,
        //     marginBottom: 50,
        //     width: "fit-content",
        //   }}
        // >
        //   Please Log In!
        // </h1>
      }
    </div>
  );
}

export default Header;
