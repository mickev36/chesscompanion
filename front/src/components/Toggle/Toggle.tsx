import React from 'react';

import './Toggle.css';

interface Props {
    status: boolean;
    onChangeStatus: (status: boolean) => void;
}

function Toggle({ status, onChangeStatus }: Props) {
    function onChange(event: any) {
        onChangeStatus(event.target.checked);
    }

    return (
        <label className="toggle-switch">
            <input type="checkbox" checked={status} onChange={onChange} />
            <span></span>
        </label>
    );
}

export default Toggle;
