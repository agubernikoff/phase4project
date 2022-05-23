import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectAvatar from "./SelectAvatar";

function Profile({ user, handleLogout, updateUser, setUserOnProfile }) {
  const [username, setUsername] = useState(user.username);
  const [display_name, setDisplayName] = useState(user.display_name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [justToBeSure, setJustToBeSure] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        display_name: display_name,
        avatar: avatar,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then(() => {
          updateUser(username, avatar, display_name);
          setErrors(["User was updated successfully"]);
          setTimeout(() => setErrors([]), 1500);
        });
      } else
        r.json().then((data) => {
          setErrors(data.errors);
          setAvatar(user.avatar);
        });
    });
  }

  function areYouSure() {
    setJustToBeSure(true);
  }

  function deleteUser() {
    fetch("/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    navigate("/login");
    handleLogout();
  }

  const edits = user.edits.map((ue) => (
    <div
      key={ue.id}
      style={{
        display: "flex",
        flexDirection: "row",
        width: "fit-content",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <p style={{ textAlign: "center" }}>
        {`Changed Pixel ${ue.location} from`}{" "}
      </p>
      <div
        style={{
          backgroundColor: ue.old_color,
          width: "1vw",
          height: "1vw",
          display: "inline-block",
          marginLeft: "1vw",
          marginRight: "1vw",
        }}
      ></div>
      <p> to </p>
      <div
        style={{
          backgroundColor: ue.new_color,
          width: "1vw",
          height: "1vw",
          display: "inline-block",
          marginLeft: "1vw",
          marginRight: "1vw",
        }}
      ></div>
      <p>
        {" "}
        on {`${new Date(ue.created_at).toLocaleDateString()}`} at{" "}
        {`${new Date(ue.created_at).toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })}`}
      </p>
    </div>
  ));

  return justToBeSure ? (
    <div
      style={{
        border: "1px solid red",
        backgroundColor: "transparent",
        width: "fit-content",
        display: "block",
        margin: "auto",
      }}
    >
      <h1 style={{ margin: 20, textAlign: "center" }}>
        Are you sure you want to delete this user?
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <button
          style={{
            display: "block",
            margin: "auto",
            marginBottom: 20,
            backgroundColor: "transparent",
            borderColor: "red",
            width: "fit-content",
            height: "fit-content",
            fontSize: "2vw",
          }}
          onClick={() => setJustToBeSure(false)}
        >
          Cancel
        </button>
        <button
          style={{
            display: "block",
            margin: "auto",
            marginBottom: 20,
            backgroundColor: "transparent",
            color: "red",
            borderColor: "red",
            width: "fit-content",
            height: "fit-content",
            fontSize: "2vw",
          }}
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <h1
          style={{
            display: "block",
            margin: "auto",
            width: "fit-content",
            color: "#ec904d",
          }}
        >
          Wassup {user.display_name}
        </h1>
        <img
          src={avatar}
          alt="avatar"
          style={{
            width: 100,
            display: "block",
            margin: "auto",
            marginTop: 20,
            marginBottom: 20,
          }}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "33%",
          margin: "auto",
        }}
      >
        <label htmlFor="username">Change Username</label>
        <input
          type="username"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
        <label htmlFor="displayName">Change Display Name</label>
        <input
          type="displayName"
          id="displayName"
          value={display_name}
          onChange={(e) => setDisplayName(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="avatar">Change Avatar</label>
        <select
          type="avatar"
          id="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          autoComplete="off"
        >
          <SelectAvatar />
        </select>
        <button type="submit" style={{ marginTop: 10, fontSize: "1.13vw" }}>
          Save Changes
        </button>
        {errors.map((err) => (
          <h3
            key={err}
            style={{
              display: "block",
              margin: "auto",
              marginTop: 10,
              textAlign: "center",
            }}
          >
            {err}
          </h3>
        ))}
      </form>
      <h3 style={{ textAlign: "center" }}>Activity</h3>
      {user.edits ? edits : null}
      <button
        onClick={areYouSure}
        style={{
          backgroundColor: "transparent",
          color: "red",
          borderColor: "red",
          width: "fit-content%",
          height: "fit-content",
          fontSize: "2.9vw",
          margin: "auto",
          marginTop: 20,
          marginBottom: 20,
          display: "block",
        }}
      >
        Delete User
      </button>
    </div>
  );
}

export default Profile;
