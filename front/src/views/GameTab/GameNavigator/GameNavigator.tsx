import React, { useCallback, useEffect } from 'react';

import './GameNavigator.css';
import { GameData } from '../../../../../common/types/types';
import GameNavigatorControls from './GameNavigatorControls/GameNavigatorControls';
import GameNavigatorMoveList from './GameNavigatorMoveList/GameNavigatorMoveList';
import EngineView from './EngineView/EngineView';

interface Props {
    gameData: GameData;
    setLoadedGameData: (gameData: GameData) => void;
}

function GameNavigator({ gameData, setLoadedGameData }: Props) {
    return (
        <div className="game-navigator">
            <EngineView setLoadedGameData={setLoadedGameData} gameData={gameData} />
            <GameNavigatorMoveList setLoadedGameData={setLoadedGameData} gameData={gameData} />
            <GameNavigatorControls setLoadedGameData={setLoadedGameData} gameData={gameData} />
        </div>
    );
}

export default GameNavigator;
