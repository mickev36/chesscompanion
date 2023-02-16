import React from 'react';

import './GameTab.css';
import Chessboard from './Chessboard/Chessboard';
import GameMetaData from './GameMetaData/GameMetaData';
import GameNavigator from './GameNavigator/GameNavigator';
import { GameData } from '../../../../common/types/types';

interface Props {
    setLoadedGameData: (gameData: GameData) => void;
    loadedGameData: GameData;
}
function GameTab({ setLoadedGameData, loadedGameData }: Props) {

    return (
        <div className="game-tab">
            <div className="panel panel-game-metadata">
                <GameMetaData
                    setLoadedGameData={setLoadedGameData}
                    loadedGameData={loadedGameData}
                />
            </div>
            <div className="panel-chess-board">
                <Chessboard gameData={loadedGameData} setLoadedGameData={setLoadedGameData} />
            </div>
            <div className="panel panel-game-navigator">
                <GameNavigator gameData={loadedGameData} setLoadedGameData={setLoadedGameData} />
            </div>
        </div>
    );
}

export default GameTab;
