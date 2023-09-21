import React from 'react';
import './GameResult.css';
import { useAppContext } from '../../../../context/AppContext';
import { renderGameResult } from '../../../../services/gameResult';

function GameResult() {
    const { gameData } = useAppContext();

    function renderResult() {
        return renderGameResult(gameData.result);
    }

    return <div className="game-result">{renderResult()}</div>;
}

export default GameResult;
