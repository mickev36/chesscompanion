import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './FileInput.css';

interface Props {
    onSelect: (event: any) => void;
    label: string;
}

function FileInput({ onSelect, label }: Props) {
    const id = uuidv4();
    return (
        <label htmlFor={id} className="file-input">
            {label}
            <input type="file" id={id} onChange={onSelect} />
        </label>
    );
}

export default FileInput;
