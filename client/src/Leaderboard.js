import React, { useEffect, useState } from "react";
import Loading from "./Loading";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [pixels, setPixels] = useState([]);

  useEffect(() => {
    fetch("/contested_pixels")
      .then((r) => r.json())
      .then((data) => setPixels(data));
  }, []);

  useEffect(() => {
    fetch("/contested_users")
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

  const sortedUsers = users
    .sort((b, a) => a.edits.length - b.edits.length)
    .slice(0, 10);
  const mappedUsers = sortedUsers.map((user) => (
    <tr key={user.id}>
      <td className="table-user">{user.username}</td>
      <td>{user.edits.length}</td>
    </tr>
  ));
  console.log(mappedUsers);

  const sortedPixels = [...pixels]
    .sort((b, a) => a.edits.length - b.edits.length)
    .slice(0, 10);
  const mappedPixels = sortedPixels.map((pixel) => (
    <tr key={pixel.id}>
      <td className="table-user">{pixel.location}</td>
      <td>{pixel.edits.length}</td>
    </tr>
  ));

  return (
    <div
      className="leaderboard"
      style={{ display: "block", margin: "auto", width: "fit-content" }}
    >
      <h1
        style={{
          display: "block",
          margin: "auto",
          width: "fit-content",
          color: "#ec904d",
          textDecoration: "underline",
        }}
      >
        Most Active Users
      </h1>
      {users[0] ? (
        <table
          style={{
            display: "block",
            margin: "auto",
            width: "fit-content",
            marginTop: 10,
          }}
        >
          <thead>
            <tr>
              <th>Users</th>
              <th>Edits</th>
            </tr>
          </thead>
          <tbody>{mappedUsers}</tbody>
        </table>
      ) : (
        <Loading />
      )}
      <br />
      <h1
        style={{
          display: "block",
          margin: "auto",
          width: "fit-content",
          color: "#ec904d",
          textDecoration: "underline",
        }}
      >
        Most Contested Pixels
      </h1>
      {pixels[1] ? (
        <table
          style={{
            display: "block",
            margin: "auto",
            width: "fit-content",
            marginTop: 10,
          }}
        >
          <thead>
            <tr>
              <th>Pixels</th>
              <th>Edits</th>
            </tr>
          </thead>
          <tbody>{mappedPixels}</tbody>
        </table>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Leaderboard;
