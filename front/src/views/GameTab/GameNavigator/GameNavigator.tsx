import React, { useState, useCallback, useEffect } from 'react';

import './GameNavigator.css';
import GameNavigatorControls from './GameNavigatorControls/GameNavigatorControls';
import GameNavigatorMoveList from './GameNavigatorMoveList/GameNavigatorMoveList';
import { EngineData, GameData } from '../../../../../common/types/types';
import EngineView from './EngineView/EngineView';

interface Props {
    gameData: GameData;
    setLoadedGameData: (gameData: GameData) => void;
}

function GameNavigator({ gameData, setLoadedGameData }: Props) {
    const [engineStatus, setEngineStatus] = useState<boolean>(false);
    const [engineData, setEngineData] = useState<EngineData[]>([]);

    function sortEngineLines(line1: EngineData, line2: EngineData) {
        if (line1.score.unit === 'mate') {
            if (line2.score.unit === 'mate') {
                return line1.score.value <= line2.score.value ? 1 : -1;
            } else {
                return -1;
            }
        }
        if (line2.score.unit === 'mate') {
            return 1;
        }
        return line1.score.value <= line2.score.value ? 1 : -1;
    }

    useEffect(() => {
        window.api.onEngineMessage((event, data) => {
            setEngineData(data.sort(sortEngineLines));
        });
    }, []);

    const onToggleEngine = (status: boolean) => {
        setEngineStatus(status);
        if (status) {
            window.api.call('engine:eval', gameData.fen);
        } else {
            window.api.call('engine:stop');
        }
    };

    return (
        <div className="game-navigator">
            <EngineView
                engineData={engineData}
                engineStatus={engineStatus}
                onToggleEngine={onToggleEngine}
            />
            <GameNavigatorMoveList setLoadedGameData={setLoadedGameData} gameData={gameData} />
            <GameNavigatorControls setLoadedGameData={setLoadedGameData} gameData={gameData} />
        </div>
    );
}

export default GameNavigator;
