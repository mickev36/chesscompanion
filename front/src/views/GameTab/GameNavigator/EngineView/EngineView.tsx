import React, { useEffect, useState } from 'react';

import './EngineView.css';
import { EngineData, GameData } from '../../../../../../common/types/types';
import Toggle from '../../../../components/Toggle/Toggle';

interface Props {
    engineData: EngineData[];
    engineStatus: boolean;
    onToggleEngine: (status: boolean) => void;
}

function EngineView({ engineData, engineStatus, onToggleEngine }: Props) {
    const renderEngineLines = () => {
        return engineData.map((engineLine, index) => {
            return (
                <span key={index} className="engine-line">
                    {engineLine.score.unit === 'mate' ? 'M' : ''}
                    {engineLine.score.unit === 'cp' && engineLine.score.value > 0 ? '+' : ''}
                    {engineLine.score.unit === 'mate'
                        ? engineLine.score.value
                        : engineLine.score.value / 100}{' '}
                    {engineLine.pv}
                </span>
            );
        });
    };

    const renderEvaluation = () => {
        if (engineData.length === 0) return '';
        const bestLine = engineData[0];
        return `${bestLine.score.unit === 'mate' ? 'M' : ''}${
            bestLine.score.unit === 'cp' && engineData[0].score.value > 0 ? '+' : ''
        }${bestLine.score.unit === 'mate' ? bestLine.score.value : bestLine.score.value / 100}`;
    };

    return (
        <div className="engine-view">
            <div className="engine-view__overview">
                <div className="engine-view__eval">{renderEvaluation()}</div>
                <Toggle status={engineStatus} onChangeStatus={onToggleEngine} />
            </div>
            <div className="engine-view__lines">{renderEngineLines()}</div>
        </div>
    );
}

export default EngineView;
