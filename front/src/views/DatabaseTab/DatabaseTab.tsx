import React, { useEffect, useState } from 'react';

import './DatabaseTab.css';

import DatabaseExplorer from './DatabaseExplorer/DatabaseExplorer';
import FileInput from '../../components/FileInput/FileInput';

interface Props {
    setSelectedTabIndex: (index: number) => void;
}
function DatabaseTab({ setSelectedTabIndex }: Props) {


    function onSelectPgnFile(path: any) {
        window.api.call('game:import', path);
    }


    return (
        <div className="database-tab">
            <div className="database-actions">
                <FileInput label="Load PGN File/Database" onSelect={onSelectPgnFile} />
            </div>
            <DatabaseExplorer changeTab={setSelectedTabIndex} />
        </div>
    );
}

export default DatabaseTab;
