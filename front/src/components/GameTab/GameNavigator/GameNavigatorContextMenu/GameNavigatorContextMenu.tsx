import React, { useCallback, useEffect } from 'react';
import './GameNavigatorContextMenu.css';

interface Props {}

function GameNavigatorContextMenu({}: Props) {
    return (
        <div className="gameNavigatorContextMenu">
            <div className="contextMenuEntry">Delete from here</div>
        </div>
    );
}

export default GameNavigatorContextMenu;
