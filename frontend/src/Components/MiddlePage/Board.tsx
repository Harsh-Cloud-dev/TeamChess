import React from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import "./Board.css";
function Board(){
  return(
    <div className="Board-Wrapper">
      <span className="Middle-Board">
        <Chessboard />
      </span>
    </div>
)
}
export default Board;