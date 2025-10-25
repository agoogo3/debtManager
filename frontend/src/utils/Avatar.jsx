import React from 'react'

const colors = [
  "#f44336", // red
  "#e91e63", // pink
  "#9c27b0", // purple
  "#3f51b5", // indigo
  "#03a9f4", // light blue
  "#009688", // teal
  "#4caf50", // green
  "#ff9800", // orange
  "#795548", // brown
  "#607d8b", // blue grey
];

function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}


const Avatar = ({name, size = 50}) => {
 const firstLetter = name ? name.charAt(0).toUpperCase() : "?";
  const bgColor = getColorFromName(name || "");

  const style = {
    backgroundColor: bgColor,
    width: size,
    height: size,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: size / 2.2,
    textTransform: "uppercase",
    userSelect: "none",
  };

  return <div style={style}>{firstLetter}</div>;
}


export default Avatar




