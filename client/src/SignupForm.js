import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import orange_ghost from "./resources/orange_ghost.png";
import SelectAvatar from "./SelectAvatar";

function SignUpForm({ onLogin, user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [display_name, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState(orange_ghost);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/");
    setErrors([]);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        display_name,
        avatar,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "33%",
          margin: "auto",
        }}
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <label htmlFor="displayName">Display Name</label>
        <input
          type="displayName"
          id="displayName"
          value={display_name}
          onChange={(e) => setDisplayName(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="avatar">Avatar</label>
        <select
          type="avatar"
          id="avatar"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          autoComplete="off"
        >
          <SelectAvatar />
        </select>
        <button type="submit" style={{ marginTop: 10 }}>
          {isLoading ? "Loading..." : "Sign Up"}
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
      <br />
      <img
        src={avatar}
        alt="avatar"
        style={{ width: 100, display: "block", margin: "auto" }}
      />
    </div>
  );
}

export default SignUpForm;
