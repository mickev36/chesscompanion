import React from 'react';

import './GameTab.css';
import Chessboard from './Chessboard/Chessboard';
import GameMetaData from './GameMetaData/GameMetaData';
import GameNavigator from './GameNavigator/GameNavigator';

function GameTab() {
    return (
        <div className="game-tab">
            <div className="panel panel-game-metadata">
                <GameMetaData />
            </div>
            <div className="panel-chess-board">
                <Chessboard />
            </div>
            <div className="panel panel-game-navigator">
                <GameNavigator />
            </div>
        </div>
    );
}

export default GameTab;
