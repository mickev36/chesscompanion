import { Chess } from 'chess.js';
import { GameResult, GameTermination } from '../types/types';

export default function getGameResult(chessInstance: Chess): { result: GameResult, termination?: GameTermination } {

    if (!chessInstance.isGameOver()) {
        return { result: '*' }
    }

    const result = chessInstance.turn() === 'w' ? '0-1' : '1-0';

    if (chessInstance.isCheckmate()) return { result, termination: 'checkmate' };
    if (chessInstance.isThreefoldRepetition())
        return { result: '1/2-1/2', termination: 'threeFoldRepetition' };
    if (chessInstance.isInsufficientMaterial())
        return { result: '1/2-1/2', termination: 'insufficientMaterial' };
    if (chessInstance.isStalemate()) return { result: '1/2-1/2', termination: 'stalemate' };

    return {
        result: '*',
    };
}
