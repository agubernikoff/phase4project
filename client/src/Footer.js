import React from "react";

function Footer() {
  return (
    <div
      className="footer"
      style={{
        width: "100%",
        height: 60,
        position: "absolute",
        bottom: 0,
      }}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: ".5vw",
        }}
      >
        Created by:{" "}
        <a
          href="https://www.linkedin.com/in/alexander-gubernikoff-b9014b14a/"
          className="footer-link"
        >
          Alexander Gubernikoff
        </a>{" "}
        |{" "}
        <a
          href="https://www.linkedin.com/in/brian-arnold-98063468/"
          className="footer-link"
        >
          Brian Arnold
        </a>{" "}
        |{" "}
        <a
          href="www.linkedin.com/in/lyssie-wright-509b32152"
          className="footer-link"
        >
          Lyssie Wright
        </a>
      </p>
    </div>
  );
}

export default Footer;
