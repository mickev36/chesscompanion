import React from 'react';
import './GameResult.css';
import { useAppContext } from '../../../../context/AppContext';
import { renderGameResult } from '../../../../services/gameResult';

function GameResult() {
    const { gameData } = useAppContext();

    function renderResult() {
        return renderGameResult(gameData.result);
    }

    function renderResultTermination() {
        if (gameData.result.winner === '*') return '';
        switch (gameData.result.termination) {
            case 'checkmate':
                return 'Checkmate';
            case 'agreement':
                return 'By agreement';
            case 'fiftyMoveRule':
                return '50 move rule';
            case 'insufficientMaterial':
                return 'Insufficient Material';
            case 'resignation':
                return 'By resignation';
            case 'stalemate':
                return 'Stalemate';
            case 'threeFoldRepetition':
                return 'Three-fold repetition';
            case 'timeout':
                return 'Timeout';
        }
    }

    return (
        <div className="game-result">
            {renderResult()}
            <span className="result-termination">{renderResultTermination()}</span>
        </div>
    );
}

export default GameResult;
