import React, { useState } from 'react';

import './GameNavigator.css';
import GameNavigatorControls from './GameNavigatorControls/GameNavigatorControls';
import GameNavigatorMoveList from './GameNavigatorMoveList/GameNavigatorMoveList';
import EngineView from './EngineView/EngineView';
import GameNavigatorSettings from './GameNavigatorSettings/GameNavigatorSettings';

function GameNavigator() {
    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    return (
        <div className="game-navigator">
            {showSettings ? (
                <GameNavigatorSettings />
            ) : (
                <>
                    <EngineView />
                    <GameNavigatorMoveList />
                </>
            )}

            <GameNavigatorControls toggleSettings={toggleSettings} />
        </div>
    );
}

export default GameNavigator;
