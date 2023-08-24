import React, { useEffect, useState } from 'react';

import './DatabaseTab.css';

import DatabaseExplorer from './DatabaseExplorer/DatabaseExplorer';

interface Props {
    setSelectedTabIndex: (index: number) => void;
}
function DatabaseTab({ setSelectedTabIndex }: Props) {
    const [selectedPgnFile, setSelectedPgnFile] = useState<string>('');

    function onSelectPgnFile(event: any) {
        // Update the state
        setSelectedPgnFile(event.target.files[0]);
    }

    useEffect(() => {
        if (selectedPgnFile !== '') {
            //uploadPgnDb(selectedPgnFile);
            setSelectedPgnFile('');
        }
    }, [setSelectedPgnFile, selectedPgnFile]);

    return (
        <div className="database-tab">
            <div className="database-actions">
                <button>
                    <label htmlFor="pgn-upload" className="pgn-upload-button">
                        Load pgn database
                    </label>
                </button>

                <input type="file" id="pgn-upload" onChange={onSelectPgnFile} />
            </div>
            <DatabaseExplorer changeTab={setSelectedTabIndex} />
        </div>
    );
}

export default DatabaseTab;
