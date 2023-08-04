import React from 'react';

import './GameNavigator.css';
import GameNavigatorControls from './GameNavigatorControls/GameNavigatorControls';
import GameNavigatorMoveList from './GameNavigatorMoveList/GameNavigatorMoveList';
import EngineView from './EngineView/EngineView';

function GameNavigator() {
    return (
        <div className="game-navigator">
            <EngineView />
            <GameNavigatorMoveList />
            <GameNavigatorControls />
        </div>
    );
}

export default GameNavigator;
