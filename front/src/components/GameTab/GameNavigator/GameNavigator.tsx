import React, { useCallback, useEffect } from 'react';

import './GameNavigator.css';
import { GameData } from '../../../../../common/types/types';
import GameNavigatorControls from './GameNavigatorControls/GameNavigatorControls';
import GameNavigatorMoveList from './GameNavigatorMoveList/GameNavigatorMoveList';

interface Props {
    gameData: GameData;
    setLoadedGameData: (gameData: GameData) => void;
}

function GameNavigator({ gameData, setLoadedGameData }: Props) {
    return (
        <div className="game-navigator">
            <GameNavigatorMoveList setLoadedGameData={setLoadedGameData} gameData={gameData} />
            <GameNavigatorControls setLoadedGameData={setLoadedGameData} gameData={gameData} />
        </div>
    );
}

export default GameNavigator;
