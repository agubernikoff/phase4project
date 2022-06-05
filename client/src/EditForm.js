import React, { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

function EditForm({
  selectedPixel,
  closeEdit,
  updatePixels,
  color,
  setColor,
  addNewEditToUser,
}) {
  const [errors, setErrors] = useState("");

  function onSubmit(e) {
    e.stopPropagation();
    console.log(color);
    const updatedPixel = {
      id: selectedPixel.id,
      color: color,
      location: selectedPixel.location,
    };
    fetch("/edits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPixel),
    }).then((r) => {
      if (r.ok)
        r.json().then((data) => {
          console.log(data);
          updatePixels({
            color: data.new_color,
            id: data.pixel_id,
            location: data.location,
          });
          addNewEditToUser(data);
          closeEdit(e);
        });
      else
        r.json().then((err) => {
          console.log(err);
          setErrors(err.errors);
        });
    });
  }
  const errorMessage = errors[1]
    ? `${errors[0] + " " + new Date(errors[1]).toLocaleTimeString()}`
    : errors[0];

  const x = selectedPixel.location.split("x")[1];
  const y = selectedPixel.location.split("x")[0];
  console.log(Math.abs((x / 70) * 100 - 100));

  const adjustRightSide = x >= 35 ? `${Math.abs((x / 70) * 100 - 101)}%` : null;
  const adjustLeftSide = x >= 35 ? null : `${(x / 70) * 100}%`;
  const adjustBottom = y >= 45 ? `${Math.abs((y / 70) * 100 - 102)}%` : null;
  const adjustTop = y >= 45 ? null : `${(y / 70) * 100}%`;
  console.log(adjustRightSide);
  return (
    <div
      style={{
        backgroundColor: "#133855",
        border: "5px solid #ec904d",
        width: "20vw",
        height: "fit-content",
        display: "block",
        margin: "auto",
        marginTop: 10,
        zIndex: 10,
        position: "absolute",
        top: adjustTop,
        bottom: adjustBottom,
        right: adjustRightSide,
        left: adjustLeftSide,
      }}
    >
      <button
        style={
          adjustBottom
            ? adjustRightSide
              ? {
                  textAlign: "center",
                  width: "fit-content",
                  height: "fit-content",
                  fontSize: "1vw",
                  position: "absolute",
                  right: 0,
                  bottom: 0,
                  marginBottom: ".1vw",
                }
              : {
                  // float: "right",
                  textAlign: "center",
                  width: "fit-content",
                  height: "fit-content",
                  fontSize: "1vw",
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  marginBottom: ".1vw",
                }
            : adjustRightSide
            ? {
                textAlign: "center",
                width: "fit-content",
                height: "fit-content",
                fontSize: "1vw",
                position: "absolute",
                right: 0,
                marginBottom: ".1vw",
              }
            : {
                // float: "right",
                textAlign: "center",
                width: "fit-content",
                height: "fit-content",
                fontSize: "1vw",
                position: "absolute",
                left: 0,
                marginBottom: ".1vw",
              }
        }
        onClick={closeEdit}
      >
        X
      </button>
      {errors ? (
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.2vw",
            marginTop: "2vw",
            marginBottom: ".1vw",
          }}
        >
          {errorMessage}
        </h2>
      ) : (
        <React.Fragment>
          <h3
            style={{
              textAlign: "center",
              width: "fit-content",
              display: "block",
              margin: "auto",
              marginTop: "1.5vw",
              marginBottom: "1.5vw",
              fontSize: "1.2vw",
            }}
          >
            Change Color
          </h3>
          <HexColorPicker
            color={color}
            onChange={setColor}
            style={{
              margin: "auto",
              marginRight: "2.5vw",
              marginLeft: "2.5vw",
              width: "15vw",
              height: "15vw",
            }}
          />
          <HexColorInput
            color={color}
            onChange={setColor}
            style={{
              margin: "auto",
              display: "block",
              marginTop: 10,
              marginBottom: 5,
              width: "12vw",
            }}
          />
          <button
            style={{
              display: "block",
              margin: "auto",
              marginTop: 10,
              marginBottom: 10,
              width: "8vw",
              fontSize: "1vw",
            }}
            onClick={(e) => onSubmit(e)}
          >
            Submit
          </button>
        </React.Fragment>
      )}
    </div>
  );
}

export default EditForm;
