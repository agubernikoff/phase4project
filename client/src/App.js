import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Canvas from "./Canvas";
import Header from "./Header";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";
import Footer from "./Footer";

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function updateUser(newName, newAvatar, newDisplayName) {
    setUser({
      ...user,
      username: newName,
      avatar: newAvatar,
      display_name: newDisplayName,
    });
  }

  function addNewEditToUser(newEdit) {
    setUser({ ...user, edits: [...user.edits, newEdit] });
  }

  function setUserOnProfile(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser("");
  }

  if (!user)
    return (
      <div>
        <div style={{ paddingBottom: 60 }}>
          <Header user={user} onLogout={handleLogout} />
          <Login onLogin={setUser} />
        </div>
        <Footer></Footer>
      </div>
    );
  // if (user) return <Canvas />;

  return (
    <div className="App">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={<Canvas addNewEditToUser={addNewEditToUser} />}
        />
        <Route
          exact
          path="/profile"
          element={
            <Profile
              user={user}
              handleLogout={handleLogout}
              updateUser={updateUser}
              setUserOnProfile={setUserOnProfile}
            />
          }
        />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
