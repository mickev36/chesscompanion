import React, { useCallback, useEffect } from 'react';
import './GameNavigatorContextMenu.css';

interface Props {}

function MoveListContextMenu({}: Props) {
    return (
        <div className="move-list__context-menu">
            <div className="contextMenuEntry">Delete from here</div>
        </div>
    );
}

export default MoveListContextMenu;
