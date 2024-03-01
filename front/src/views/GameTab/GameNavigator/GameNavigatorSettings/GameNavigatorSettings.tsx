import React, { useState } from 'react';

import './GameNavigatorSettings.css';
import { useAppContext } from '../../../../context/AppContext';
import Tooltip from '../../../../components/Tooltip/Tooltip';

function GameNavigatorSettings() {
    const { config } = useAppContext();
    const [engineLineCount, setEngineLineCount] = useState(config.engine.analysisLineCount);

    const changeEngineLineCount = (event: any) => {
        setEngineLineCount(event.target.value);
        window.api.call('engine:setAnalysisLineCount', event.target.value);
    };

    return (
        <div className="game-navigator__settings">
            Engine analysis lines : {engineLineCount} / 5
            <Tooltip content={'Number of analysis lines for the engine'} />
            <input
                type="range"
                onChange={changeEngineLineCount}
                step={1}
                min={1}
                max={5}
                value={engineLineCount}
            />
        </div>
    );
}

export default GameNavigatorSettings;
