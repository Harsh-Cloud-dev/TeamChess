#ifndef CHESSBOARD_H
#define CHESSBOARD_H

#include <vector>
#include <string>

class ChessBoard {
public:
    ChessBoard();
    void reset_board();
    std::vector<std::string> get_legal_moves();
    void make_move(const std::string& move);
    std::string get_fen() const;
private:
    // Internal board representation (simple 8x8 array for example)
    char board[8][8];
};

#endif
