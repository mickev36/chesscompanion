import { ChessInstance } from 'chess.js';
import { GameResult } from '../types/types';

export default function getGameResult(chessInstance: ChessInstance): GameResult {
    const winner = chessInstance.turn() === 'w' ? 'b' : 'w';

    if (chessInstance.in_checkmate()) return { winner, termination: 'checkmate' };
    if (chessInstance.in_checkmate()) return { winner, termination: 'checkmate' };
    if (chessInstance.in_threefold_repetition())
        return { winner, termination: 'threeFoldRepetition' };
    if (chessInstance.insufficient_material())
        return { winner, termination: 'insufficientMaterial' };
    if (chessInstance.in_stalemate()) return { winner, termination: 'stalemate' };

    return {
        winner: '*',
    };
}

export function renderGameResult(result: GameResult) {
    switch (result.winner) {
        case 'w':
            return '1 - 0';
        case 'b':
            return '0 - 1';
        case 'draw':
            return '1/2 - 1/2';
        default:
            return '';
    }
}
