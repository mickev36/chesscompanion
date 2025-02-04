import React from 'react';
import './GameResult.css';
import { useAppContext } from '../../../../context/AppContext';

function GameResult() {
    const { gameData } = useAppContext();


    function renderResultTermination() {
        if (gameData.result === '*') return '';
        switch (gameData.termination) {
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
            default:
                return '';
        }
    }

    return (
        <div className="game-result">
            {gameData.result}
            <span className="result-termination">{renderResultTermination()}</span>
        </div>
    );
}

export default GameResult;
