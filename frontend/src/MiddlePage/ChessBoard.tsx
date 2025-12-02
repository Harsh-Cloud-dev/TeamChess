import React, { useState } from "react";
import "./ChessBoard.css";

// Map piece codes to image paths
const pieceImages: Record<string, string> = { 
wK: "../src/assets/pieces-basic-svg/wK.svg",
wQ: "../src/assets/pieces-basic-svg/wQ.svg", 
wR: "../src/assets/pieces-basic-svg/wR.svg", 
wB: "../src/assets/pieces-basic-svg/wB.svg", 
wN: "../src/assets/pieces-basic-svg/wN.svg", 
wP: "../src/assets/pieces-basic-svg/wP.svg", 
bK: "../src/assets/pieces-basic-svg/bK.svg", 
bQ: "../src/assets/pieces-basic-svg/bQ.svg", 
bR: "../src/assets/pieces-basic-svg/bR.svg", 
bB: "../src/assets/pieces-basic-svg/bB.svg", 
bN: "../src/assets/pieces-basic-svg/bN.svg", 
bP: "../src/assets/pieces-basic-svg/bP.svg" };

// Initial board setup
const initialBoard: (string | null)[][] = [
  ["bR","bN","bB","bQ","bK","bB","bN","bR"],
  ["bP","bP","bP","bP","bP","bP","bP","bP"],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null,null],
  ["wP","wP","wP","wP","wP","wP","wP","wP"],
  ["wR","wN","wB","wQ","wK","wB","wN","wR"],
];

const ChessBoard: React.FC = () => {
  const [boardState, setBoardState] = useState<(string | null)[][]>(initialBoard);
  const [selected, setSelected] = useState<{row:number, col:number} | null>(null);

  // Handle click on a square
  const handleSquareClick = (row: number, col: number) => {
    const piece = boardState[row][col];

    if (selected) {
      const { row: srcRow, col: srcCol } = selected;
      if (srcRow === row && srcCol === col) {
        setSelected(null); // deselect if same square
        return;
      }
      // Move piece
      const newBoard = boardState.map(r => [...r]);
      newBoard[row][col] = boardState[srcRow][srcCol];
      newBoard[srcRow][srcCol] = null;
      setBoardState(newBoard);
      setSelected(null);
    } else if (piece) {
      setSelected({ row, col }); // select piece
    }
  };

  // Render board
  return (
    <div className="chessboard">
      {boardState.map((rowArray, row) => (
        <div key={row} className="row">
          {rowArray.map((piece, col) => {
            const isDark = (row + col) % 2 === 1;
            return (
              <div
                key={`${row}-${col}`}
                className={`square ${isDark ? "dark" : "light"} ${selected?.row === row && selected?.col === col ? "selected" : ""}`}
                onClick={() => handleSquareClick(row, col)}
              >
                {/* Rank and file coordinates */}
                {col === 0 && <span className="coord_rank">{8 - row}</span>}
                {row === 7 && <span className="coord_file">{String.fromCharCode(97 + col)}</span>}

                {/* Piece image */}
                {piece && (
                  <img
                    src={pieceImages[piece]!}
                    alt={piece}
                    className="piece"
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
