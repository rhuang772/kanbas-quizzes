import React from "react";
import { FaBold, FaItalic, FaHighlighter, FaTrashAlt } from "react-icons/fa";
import { FiUnderline } from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaKeyboard } from "react-icons/fa";
import { Box } from "@mui/material";

function PossibleAnswer() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <i className="fa-solid fa-arrow-right green-arrow"></i>
        <h6 style={{ margin: "0 10px" }}>Possible Answer:</h6>
        <input type="number" value="" />
      </div>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <button className="red-outline">
          <i className="fa-solid fa-ellipsis"></i>
        </button>
        <button className="red-outline">
          <FaTrashAlt /> 
        </button>
      </div>
    </div>
  );
}

export default PossibleAnswer;