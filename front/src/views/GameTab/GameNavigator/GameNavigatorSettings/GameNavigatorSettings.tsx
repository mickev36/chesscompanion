import React, { useState } from 'react';

import './GameNavigatorSettings.css';
import { useAppContext } from '../../../../context/AppContext';

function GameNavigatorSettings() {
    const { config } = useAppContext();
    const [engineLineCount, setEngineLineCount] = useState(config.engine.analysisLineCount);

    const changeEngineLineCount = (event: any) => {
        setEngineLineCount(event.target.value);
        window.api.call('engine:setAnalysisLineCount', event.target.value);
    };

    return (
        <div className="game-navigator__settings">
            Analysis lines : {engineLineCount} / 5
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
