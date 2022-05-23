import React, { useState, useEffect } from "react";
import Pixel from "./Pixel";
import Loading from "./Loading";
import { createConsumer } from "@rails/actioncable";

function Canvas({ addNewEditToUser }) {
  const [pixels, setPixels] = useState([]);
  const [hoveredPixel, setHoveredPixel] = useState("100x100");
  const [size, setSize] = useState("90vw");
  const [popUp, setPopUp] = useState(true);

  useEffect(() => {
    fetch("/pixels")
      .then((r) => r.json())
      .then((data) => setPixels(data));
  }, []);

  function updatePixels(updatedPixel) {
    const filtered = [...pixels].filter((p) => p.id !== updatedPixel.id);
    const sorted = [...filtered, updatedPixel].sort((a, b) => a.id - b.id);
    setPixels(sorted);
  }

  useEffect(() => {
    const cable = createConsumer(
      // "ws://localhost:3000/cable"
      "wss://phase-4-project-pixel-app.herokuapp.com/cable"
    );

    const paramsToSend = { channel: "EditChannel" };

    const handlers = {
      received(data) {
        const updatedPixel = {
          color: data.new_color,
          id: data.pixel_id,
          location: data.location,
        };
        updatePixels(updatedPixel);
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
  });

  console.log(pixels);

  const mappedpixels = pixels.map((p) => (
    <Pixel
      key={p.id}
      pixel={p}
      updatePixels={updatePixels}
      setHoveredPixel={setHoveredPixel}
      addNewEditToUser={addNewEditToUser}
    />
  ));

  function zoomIn() {
    const number = parseInt(size.split("vw")[0]);
    setSize(`${number + 10}vw`);
  }
  function zoomOut() {
    const number = parseInt(size.split("vw")[0]);
    setSize(`${number - 10}vw`);
  }

  function closePopUp() {
    setPopUp(false);
  }

  return (
    <div
      className="canvas"
      style={{ justifyContent: "center", position: "relative" }}
    >
      {popUp ? (
        <div
          style={{
            backgroundColor: "#133855",
            width: "40vw",
            border: "1vw ridge #ec904d",
            padding: "1vw",
            position: "fixed",
            top: "30vh",
            right: "30vw",
            zIndex: 3,
          }}
        >
          <button
            style={{
              textAlign: "center",
              width: "fit-content",
              height: "fit-content",
              fontSize: "1vw",
              position: "absolute",
              right: 0,
              top: 0,
              marginBottom: ".1vw",
            }}
            onClick={closePopUp}
          >
            X
          </button>
          <h1 style={{ color: "#ec904d", textAlign: "center" }}>
            How It Works
          </h1>
          <p style={{ textAlign: "center" }}>
            Simply click a pixel to use the pop up edit form to change the
            pixel's color.
          </p>
          <p style={{ textAlign: "center" }}>
            Users can change a single pixel per minute.
          </p>
          <p style={{ textAlign: "center" }}>
            Try collaborating with other to make something beautful.
          </p>
        </div>
      ) : null}
      <h3
        className="rules"
        style={{
          textAlign: "center",
          cursor: "pointer",
          textDecoration: "underline",
          display: "block",
          margin: "auto",
          marginBottom: 15,
          width: "fit-content",
        }}
        onClick={() => setPopUp(true)}
      >
        Rules
      </h3>
      <div
        style={{
          margin: "auto",
          marginBottom: 10,
          marginTop: 10,
          width: "fit-content",
          display: "flex",
        }}
      >
        <strong style={{ fontSize: "2.5vw" }}>Z</strong>
        <button
          style={{
            backgroundColor: "transparent",
            border: ".2vw solid #ec904d",
            color: "#ec904d",
            position: "relative",
            width: "2.31vw",
            height: "2.31vw",
            marginLeft: 1,
            marginRight: 1,
            fontSize: "1vw",
          }}
          onClick={zoomIn}
        >
          +
        </button>
        <button
          style={{
            backgroundColor: "transparent",
            border: ".2vw solid #ec904d",
            color: "#ec904d",
            position: "relative",
            width: "2.31vw",
            height: "2.31vw",
            marginLeft: 1,
            marginRight: 3,
            fontSize: "1vw",
          }}
          onClick={zoomOut}
        >
          -
        </button>
        <strong style={{ fontSize: "2.5vw" }}>M</strong>
      </div>
      <div
        style={{
          position: "sticky",
          backgroundColor: "transparent",
          width: "fit-content",
          height: 25,
          display: "block",
          margin: "auto",
          top: 5,
          zIndex: 2,
        }}
      >
        <p style={{ border: ".1vw ridge #ec904d", backgroundColor: "#133855" }}>
          {hoveredPixel.location}
        </p>
      </div>
      <div
        style={{
          position: "relative",
          border: "thick ridge #ec904d",
          height: size,
          width: size,
          margin: "auto",
          display: "block",
          overflow: "scroll",
          padding: 2,
        }}
      >
        {pixels[1] ? (
          mappedpixels
        ) : (
          <div
            className="loading-div"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}

export default Canvas;
