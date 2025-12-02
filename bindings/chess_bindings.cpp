#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include "../backend/Chessboard.h"

namespace py = pybind11;

PYBIND11_MODULE(chess_engine, m) {
    py::class_<ChessBoard>(m, "ChessBoard")
        .def(py::init<>())
        .def("reset_board", &ChessBoard::reset_board)
        .def("get_legal_moves", &ChessBoard::get_legal_moves)
        .def("make_move", &ChessBoard::make_move)
        .def("get_fen", &ChessBoard::get_fen);
}
