import React, { useState, useEffect } from "react";
import EditForm from "./EditForm";

function Pixel({ pixel, setHoveredPixel, addNewEditToUser }) {
  const [outline, setOutline] = useState("");
  const [selectedPixel, setSelectedPixel] = useState("");
  const [color, setColor] = useState(pixel.color);

  useEffect(() => {
    setColor(pixel.color);
  }, [pixel.color]);

  function onPixelClick(pixel) {
    setSelectedPixel(pixel);
    setOutline("");
  }

  function closeEdit(e) {
    e.stopPropagation();
    setSelectedPixel("");
    setOutline("");
    if (e.target.innerText === "X") setColor(pixel.color);
  }

  return (
    <>
      <div
        className="pixel"
        style={{
          backgroundColor: color,
          width: "1.428%",
          height: "1.428%",
          display: "block",
          float: "left",
          outline: outline,
        }}
        onMouseEnter={() => {
          setOutline("3px solid #ec904d");
          setHoveredPixel(pixel);
          console.log(color);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setOutline("");
          setHoveredPixel("");
        }}
        onClick={(e) => {
          e.stopPropagation();
          onPixelClick(pixel);
          console.log(pixel.location);
        }}
      ></div>
      {selectedPixel ? (
        <EditForm
          selectedPixel={selectedPixel}
          closeEdit={closeEdit}
          color={color}
          setColor={setColor}
          addNewEditToUser={addNewEditToUser}
        />
      ) : null}
    </>
  );
}

export default Pixel;
