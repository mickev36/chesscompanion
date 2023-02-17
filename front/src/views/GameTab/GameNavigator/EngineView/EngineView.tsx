import React, { useCallback, useEffect, useState } from 'react';

import './EngineView.css';
import { GameData } from '../../../../../../common/types/types';
import { Chess, ChessInstance, Move, Square } from 'chess.js';
import Toggle from '../../../../components/Toggle/Toggle';
import { gameDataToPgn } from '../../../../services/gameDataPgnConversion';

interface Props {
    gameData: GameData;
    setLoadedGameData: (gameData: GameData) => void;
}

window.api.onEngineMessage((event, data) => {
    console.log('Received Engine message');
    console.log(data);
});

function EngineView({ gameData, setLoadedGameData }: Props) {
    const [engineStatus, setEngineStatus] = useState<boolean>(false);

    const onToggleEngine = (status: boolean) => {
        setEngineStatus(status);
        if (status) {
            // TODO : Reuse chess instance ?
            const chess = new Chess();
            chess.load_pgn(gameDataToPgn(gameData));
            window.api.call('engine:eval', chess.fen());
        } else {
            window.api.call('engine:stop');
        }
    };

    return (
        <div className="engine-view">
            <div className="engine-view__eval">+0.3</div>
            <Toggle status={engineStatus} onChangeStatus={onToggleEngine} />
        </div>
    );
}

export default EngineView;
