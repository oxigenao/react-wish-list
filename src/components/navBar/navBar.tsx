import React from "react";

const navStyle = {
  margin: "10px",
  padding: "10px",
};

function NavBar() {
  return (
    <nav style={navStyle}>
      <a style={{ textDecoration: "none" }} href="/">
        <span role="img" aria-label="wish">
          🤤
        </span>
      </a>
    </nav>
  );
}

export default NavBar;
