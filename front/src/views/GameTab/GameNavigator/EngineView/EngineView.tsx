import React, { useCallback, useEffect, useState } from 'react';

import './EngineView.css';
import { GameData } from '../../../../../../common/types/types';
import Toggle from '../../../../components/Toggle/Toggle';

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
            window.api.call('engine:eval', gameData.fen);
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
