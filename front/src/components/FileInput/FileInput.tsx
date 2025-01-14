import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { webUtils } from 'electron'

import './FileInput.css';

interface Props {
    onSelect: (event: any) => void;
    label: string;
}

function FileInput({ onSelect, label }: Props) {
    const id = uuidv4();
    function onChange(event: any) {
        onSelect(window.api.getPathForFile(event.target.files[0]));
    }

    return (
        <label htmlFor={id} className="file-input">
            {label}
            <input type="file" id={id} onChange={onChange} />
        </label>
    );
}

export default FileInput;
