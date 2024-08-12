import React, { useState, useEffect } from "react";
import Pixel from "./Pixel";
import Loading from "./Loading";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { pixelsActions } from "./store/pixels-slice";

function Canvas({ addNewEditToUser, user }) {
  const dispatch = useDispatch();
  const pixels = useSelector((state) => state.pixels.pixels);
  const [hoveredPixel, setHoveredPixel] = useState("100x100");
  const [size, setSize] = useState("90vw");
  const [popUp, setPopUp] = useState(true);
  const edits = useSelector((state) => state.pixels.edits);
  const chat = useSelector((state) => state.pixels.chat);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    fetch("/pixels")
      .then((r) => r.json())
      .then((data) => dispatch(pixelsActions.setPixels(data)));
  }, [dispatch]);

  const messages = edits.map((ue) => (
    <div
      key={uuidv4()}
      className={
        ue.message
          ? ue.user.id === user.id
            ? "my-message"
            : "your-message"
          : "activity-update"
      }
    >
      <div
        className="message-user"
        style={
          ue.user.id === user.id && ue.message
            ? {
                flexDirection: "row-reverse",
                marginLeft: ".7vw",
              }
            : {
                flexDirection: "row",
                marginRight: ".7vw",
              }
        }
      >
        <img
          src={ue.user.avatar}
          alt={ue.user.username}
          style={{ width: "2vw" }}
        />
        <p>
          {
            ue.user.display_name ? ue.user.display_name : ue.user.username
            // "1234567890123456789012345"
          }{" "}
        </p>
        {ue.message ? <p>{":"}</p> : null}
      </div>
      {ue.message ? (
        <p>"{ue.message}"</p>
      ) : (
        <>
          <p style={{ textAlign: "center" }}>
            {`changed Pixel ${ue.location} from`}{" "}
          </p>
          <div
            className="edit-message-div"
            style={{
              backgroundColor: ue.old_color,
            }}
          ></div>
          <p> to </p>
          <div
            className="edit-message-div"
            style={{
              backgroundColor: ue.new_color,
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
        </>
      )}
    </div>
  ));

  // const activity = document.getElementsByClassName("chat")[0];

  // const activityExpand = document.getElementsByClassName("chat-expand")[0];
  // const activity = useEffect(() => {
  //   document.getElementsByClassName("chat-container")[0].lastChild;
  //   // return activity;
  // });
  // console.log(activity);

  const mappedpixels = pixels.map((p) => (
    <Pixel
      key={p.id}
      pixel={p}
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

  function sendChat() {
    fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: chat }),
    });
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
      <h3 className="rules" onClick={() => setPopUp(true)}>
        Rules
      </h3>
      <div className="chat-container">
        <h3
          className="rules"
          onClick={() => {
            setExpand(!expand);
            if (expand) {
              setTimeout(() => {
                document
                  .getElementsByClassName("chat-container")[0]
                  .lastChild.scroll({
                    top: document.getElementsByClassName("chat-container")[0]
                      .lastChild.scrollHeight,
                  });
              }, 10);
            }
          }}
        >
          Activity
        </h3>
        <div className={expand ? "chat" : "chat-expand"}>
          {expand ? (
            <>
              {messages}
              <div className="chat-input">
                <input
                  value={chat}
                  onChange={(e) =>
                    dispatch(pixelsActions.setChat(e.target.value))
                  }
                ></input>
                <button onClick={() => sendChat()}>send</button>
              </div>
            </>
          ) : (
            // ) : (edits[0] ? (
            //   <div
            //     className={
            //       edits[edits.length - 1].message
            //         ? edits[edits.length - 1].user.id === user.id
            //           ? "my-message"
            //           : "your-message"
            //         : "activity-update"
            //     }
            //   >
            //     <div
            //       className="message-user"
            //       style={
            //         edits[edits.length - 1].user.id === user.id &&
            //         edits[edits.length - 1].message
            //           ? {
            //               flexDirection: "row-reverse",
            //               marginLeft: ".7vw",
            //             }
            //           : {
            //               flexDirection: "row",
            //               marginRight: ".7vw",
            //             }
            //       }
            //     >
            //       <img
            //         src={edits[edits.length - 1].user.avatar}
            //         alt={edits[edits.length - 1].user.username}
            //         style={{ width: "2vw" }}
            //       />
            //       <p>
            //         {
            //           edits[edits.length - 1].user.display_name
            //             ? edits[edits.length - 1].user.display_name
            //             : edits[edits.length - 1].user.username
            //           // "1234567890123456789012345"
            //         }{" "}
            //       </p>
            //       {edits[edits.length - 1].message ? <p>{":"}</p> : null}
            //     </div>
            //     {edits[edits.length - 1].message ? (
            //       <p>"{edits[edits.length - 1].message}"</p>
            //     ) : (
            //       <>
            //         <p style={{ textAlign: "center" }}>
            //           {`changed Pixel ${edits[edits.length - 1].location} from`}{" "}
            //         </p>
            //         <div
            //           className="edit-message-div"
            //           style={{
            //             backgroundColor: edits[edits.length - 1].old_color,
            //           }}
            //         ></div>
            //         <p> to </p>
            //         <div
            //           className="edit-message-div"
            //           style={{
            //             backgroundColor: edits[edits.length - 1].new_color,
            //           }}
            //         ></div>
            //         <p>
            //           {" "}
            //           on{" "}
            //           {`${new Date(
            //             edits[edits.length - 1].created_at
            //           ).toLocaleDateString()}`}{" "}
            //           at{" "}
            //           {`${new Date(
            //             edits[edits.length - 1].created_at
            //           ).toLocaleTimeString(navigator.language, {
            //             hour: "2-digit",
            //             minute: "2-digit",
            //           })}`}
            //         </p>
            //       </>
            //     )}
            //   </div>
            // ) :
            <>
              <p>No messages yet...</p>
              {messages}
            </>
          )}
        </div>
      </div>
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
