import React, { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

function ChessBoard() {
  const [game, setGame] = useState(new Chess());
  const [boardSize, setBoardSize] = useState(400);

  useEffect(() => {
    const handleResize = () => {
      const maxSize = Math.min(window.innerWidth, window.innerHeight - 80);
      setBoardSize(maxSize > 400 ? 400 : maxSize);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onDrop = (sourceSquare, targetSquare) => {
    const gameCopy = new Chess(game.fen()); // create a new game from current state
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false; // illegal move
    setGame(gameCopy); // set new object to state
    return true;
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
        width: "100%",
        background: "radial-gradient(circle at center, #1a1a1a 0%, #0f0f0f 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "80px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: boardSize,
          height: boardSize,
          boxShadow: "0 0 30px rgba(0, 255, 136, 0.5)",
          borderRadius: "12px",
          padding: "6px",
          background: "rgba(0, 255, 136, 0.1)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Chessboard
          position={game.fen()} // pass FEN string, not the object
          onPieceDrop={onDrop}
          boardOrientation="white"
          boardWidth={boardSize}
          customBoardStyle={{ borderRadius: "12px" }}
          customLightSquareStyle={{ backgroundColor: "#f0d9b5" }}
          customDarkSquareStyle={{ backgroundColor: "#b58863" }}
        />
      </div>
    </div>
  );
}

export default ChessBoard;
