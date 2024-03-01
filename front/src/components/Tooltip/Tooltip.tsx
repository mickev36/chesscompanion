import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import './Tooltip.css';
import { FaQuestion } from 'react-icons/fa';

interface Props {
    content: React.ReactNode;
}

function Tooltip({ content }: Props) {
    return (
        <>
            <button className="tooltip-icon" data-tooltip-id="my-tooltip">
                <FaQuestion />
            </button>
            <ReactTooltip className="tooltip" id="my-tooltip">
                {content}
            </ReactTooltip>
        </>
    );
}

export default Tooltip;
