import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Canvas from "./Canvas";
import Header from "./Header";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";
import Footer from "./Footer";
import { createConsumer } from "@rails/actioncable";
import { useDispatch } from "react-redux";
import { pixelsActions } from "./store/pixels-slice";

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");

  useEffect(() => {
    const cable = createConsumer(
      "ws://192.168.1.71:3000/cable"
      // "wss://phase-4-project-pixel-app.herokuapp.com/cable"
    );

    const paramsToSend = { channel: "EditChannel" };

    const handlers = {
      received(data) {
        console.log("tthtthisishdif", data);
        if (!data.message) {
          const updatedPixel = {
            color: data.edit.new_color,
            id: data.edit.pixel_id,
            location: data.edit.location,
          };
          dispatch(pixelsActions.updatePixels(updatedPixel));
        }
        dispatch(
          pixelsActions.setEdits({
            ...data.edit,
            user: data.user,
            message: data.message,
          })
        );
        document.getElementsByClassName("chat-container")[0].lastChild.scroll({
          top: document.getElementsByClassName("chat-container")[0].lastChild
            .scrollHeight,
          behavior: "smooth",
        });
        dispatch(pixelsActions.setChat(""));
      },

      connected() {
        console.log("connected");
      },

      disconnected() {
        console.log("disconnected");
      },
    };

    const subscription = cable.subscriptions.create(paramsToSend, handlers);

    return function cleanup() {
      subscription.unsubscribe();
    };
  }, [dispatch]);

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
          element={<Canvas addNewEditToUser={addNewEditToUser} user={user} />}
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
