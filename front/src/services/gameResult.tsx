import { Chess } from 'chess.js';
import { GameResult } from '../types/types';

export default function getGameResult(chessInstance: Chess): GameResult {
    const winner = chessInstance.turn() === 'w' ? 'b' : 'w';

    if (chessInstance.isCheckmate()) return { winner, termination: 'checkmate' };
    if (chessInstance.isThreefoldRepetition())
        return { winner: 'draw', termination: 'threeFoldRepetition' };
    if (chessInstance.isInsufficientMaterial())
        return { winner: 'draw', termination: 'insufficientMaterial' };
    if (chessInstance.isStalemate()) return { winner: 'draw', termination: 'stalemate' };

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
