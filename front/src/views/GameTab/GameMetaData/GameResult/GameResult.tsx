import React from 'react';
import './GameResult.css';
import { useAppContext } from '../../../../context/AppContext';
import { Chess } from 'chess.js';

function GameResult() {
    const { gameData } = useAppContext();


    function renderResultTermination() {
        if (gameData.termination !== "Normal") return gameData.termination;
        const chessInstance = new Chess();
        chessInstance.loadPgn(gameData.pgn) //Load the whole game to compute termination
        if (chessInstance.isCheckmate()) return "Checkmate";
        if (chessInstance.isThreefoldRepetition()) return "Three fold repetition"
        if (chessInstance.isInsufficientMaterial()) return "Insufficient Material"
        if (chessInstance.isStalemate()) return "Stalemate"
        return "Resignation"
    }

    return (
        <div className="game-result">
            {gameData.result}
            <span className="result-termination">{renderResultTermination()}</span>
        </div>
    );
}

export default GameResult;
