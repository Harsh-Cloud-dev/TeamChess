#!/usr/bin/env python3
from typing import Optional, Tuple
import sys
import os

import chess
from PyQt6.QtWidgets import QApplication, QWidget
from PyQt6.QtGui import QPainter, QMouseEvent, QColor
from PyQt6.QtSvg import QSvgRenderer
from PyQt6.QtCore import Qt, QRectF, QPointF


class ChessGUI(QWidget):
    def __init__(self) -> None:
        super().__init__()
        self.setWindowTitle("PyQt6 Chess GUI")
        self.resize(680, 680)

        # Game state
        self.board: chess.Board = chess.Board()

        # Selection / dragging state
        self.selected_square: Optional[int] = None
        self.dragging: bool = False
        self.drag_square: Optional[int] = None
        self.drag_pos: Tuple[float, float] = (0.0, 0.0)

        # Load SVG renderers
        self.piece_renderers: dict[str, QSvgRenderer] = {}
        self.load_piece_svgs()

    # ----------------- Asset Loading -----------------
    def load_piece_svgs(self) -> None:
        pieces_dir = "pieces"
        if not os.path.isdir(pieces_dir):
            raise FileNotFoundError(f"Missing '{pieces_dir}' directory with SVG pieces.")

        for filename in os.listdir(pieces_dir):
            if not filename.lower().endswith(".svg"):
                continue
            key = filename[:-4]  # remove .svg
            path = os.path.join(pieces_dir, filename)
            try:
                renderer = QSvgRenderer(path)
                if not renderer.isValid():
                    print(f"Warning: SVG invalid or couldn't be loaded: {path}")
                    continue
                self.piece_renderers[key] = renderer
            except Exception as e:
                print(f"Error loading {path}: {e}")

        # Quick check - list missing keys
        needed = [f"{c}{p}" for c in ("w", "b") for p in ("P", "N", "B", "R", "Q", "K")]
        missing = [k for k in needed if k not in self.piece_renderers]
        if missing:
            print("Warning: Missing piece SVGs:", missing)

    # ----------------- Painting -----------------
    def paintEvent(self, event) -> None:
        painter = QPainter(self)
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)

        canvas_size = min(self.width(), self.height())
        board_rect_x = (self.width() - canvas_size) / 2
        board_rect_y = (self.height() - canvas_size) / 2
        square_size = canvas_size / 8.0

        # Draw board squares using QRectF (accepts floats)
        light_color = QColor(240, 217, 181)
        dark_color = QColor(181, 136, 99)
        for rank in range(8):
            for file in range(8):
                x = board_rect_x + file * square_size
                y = board_rect_y + rank * square_size
                color = light_color if (rank + file) % 2 == 0 else dark_color
                painter.fillRect(QRectF(x, y, square_size, square_size), color)

        # Highlight selected square (semi-transparent yellow)
        if self.selected_square is not None:
            f = chess.square_file(self.selected_square)
            r = 7 - chess.square_rank(self.selected_square)
            x = board_rect_x + f * square_size
            y = board_rect_y + r * square_size
            painter.fillRect(QRectF(x, y, square_size, square_size), QColor(255, 255, 0, 90))

            # Highlight legal moves from selected square (green circles)
            painter.setPen(Qt.PenStyle.NoPen)
            painter.setBrush(QColor(0, 200, 0, 140))
            for move in self.board.legal_moves:
                if move.from_square == self.selected_square:
                    tf = chess.square_file(move.to_square)
                    tr = 7 - chess.square_rank(move.to_square)
                    cx = board_rect_x + tf * square_size + square_size * 0.5
                    cy = board_rect_y + tr * square_size + square_size * 0.5
                    radius = square_size * 0.18
                    painter.drawEllipse(QRectF(cx - radius, cy - radius, radius * 2, radius * 2))

        # Draw pieces (skip the one being dragged)
        for sq, piece in self.board.piece_map().items():
            if self.dragging and self.drag_square == sq:
                continue
            self._draw_piece_at_square(painter, sq, board_rect_x, board_rect_y, square_size)

        # Draw the dragged piece on top (if any)
        if self.dragging and self.drag_square is not None:
            piece = self.board.piece_at(self.drag_square)
            if piece:
                px, py = self.drag_pos
                key = ("w" if piece.color else "b") + piece.symbol().upper()
                renderer = self.piece_renderers.get(key)
                if renderer:
                    size = square_size
                    rect = QRectF(px - size / 2.0, py - size / 2.0, size, size)
                    renderer.render(painter, rect)

        painter.end()

    def _draw_piece_at_square(self, painter: QPainter, sq: int, board_x: float, board_y: float, sq_size: float) -> None:
        piece = self.board.piece_at(sq)
        if not piece:
            return
        f = chess.square_file(sq)
        r = 7 - chess.square_rank(sq)
        x = board_x + f * sq_size
        y = board_y + r * sq_size
        key = ("w" if piece.color else "b") + piece.symbol().upper()
        renderer = self.piece_renderers.get(key)
        if renderer:
            renderer.render(painter, QRectF(x, y, sq_size, sq_size))
        else:
            # If missing renderer, draw a simple placeholder circle
            painter.setPen(Qt.PenStyle.SolidLine)
            painter.setBrush(QColor(50, 50, 50))
            painter.drawEllipse(QRectF(x + sq_size * 0.2, y + sq_size * 0.2, sq_size * 0.6, sq_size * 0.6))

    # ----------------- Mouse helpers -----------------
    def _board_coords_from_pos(self, px: float, py: float) -> Optional[int]:
        """Convert widget coordinates (px,py) to a chess square (0..63) or None if outside board."""
        canvas_size = min(self.width(), self.height())
        board_left = (self.width() - canvas_size) / 2
        board_top = (self.height() - canvas_size) / 2
        square_size = canvas_size / 8.0

        # Check bounds
        if px < board_left or px > board_left + canvas_size or py < board_top or py > board_top + canvas_size:
            return None

        file = int((px - board_left) // square_size)
        rank = int((py - board_top) // square_size)
        # convert to chess square index (0 = a1)
        # our drawing uses rank 0 = top (8th rank visually), so convert:
        chess_rank = 7 - rank
        if 0 <= file <= 7 and 0 <= chess_rank <= 7:
            return chess.square(file, chess_rank)
        return None

    # ----------------- Mouse events (drag & drop) -----------------
    def mousePressEvent(self, event: QMouseEvent) -> None:
        posf: QPointF = event.position()
        px, py = posf.x(), posf.y()
        sq = self._board_coords_from_pos(px, py)

        if sq is None:
            # Click outside board clears selection
            self.selected_square = None
            self.update()
            return

        piece = self.board.piece_at(sq)
        # Only allow selecting your own side to move
        if piece and piece.color == self.board.turn:
            self.selected_square = sq
            self.dragging = True
            self.drag_square = sq
            self.drag_pos = (px, py)
        else:
            # If clicked an empty square or opponent piece - treat as attempt to move if a selection exists
            if self.selected_square is not None:
                # Try move from selected_square to sq
                move = chess.Move(self.selected_square, sq)
                if move in self.board.legal_moves:
                    self.board.push(move)
                self.selected_square = None

        self.update()

    def mouseMoveEvent(self, event: QMouseEvent) -> None:
        if not self.dragging:
            return
        posf: QPointF = event.position()
        self.drag_pos = (posf.x(), posf.y())
        self.update()

    def mouseReleaseEvent(self, event: QMouseEvent) -> None:
        if not self.dragging:
            return

        posf: QPointF = event.position()
        px, py = posf.x(), posf.y()
        sq_to = self._board_coords_from_pos(px, py)

        if self.drag_square is not None and sq_to is not None:
            move = chess.Move(self.drag_square, sq_to)
            if move in self.board.legal_moves:
                self.board.push(move)

        # reset dragging state
        self.selected_square = None
        self.dragging = False
        self.drag_square = None
        self.update()


# ----------------- Run -----------------
def main() -> None:
    app = QApplication(sys.argv)
    gui = ChessGUI()
    gui.show()
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
