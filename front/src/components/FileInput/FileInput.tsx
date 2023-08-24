import React from 'react';

import './FileInput.css';

interface Props {
    onSelect: (event: any) => void;
    label: string;
}

function FileInput({ onSelect, label }: Props) {
    return (
        <label htmlFor="loadDatabase" className="file-input">
            {label}
            <input type="file" id="loadDatabase" onChange={onSelect} />
        </label>
    );
}

export default FileInput;
