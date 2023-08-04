import React, { useEffect, useState } from 'react';

import './EngineView.css';
import { EngineData } from '../../../../../../common/types/types';
import Toggle from '../../../../components/Toggle/Toggle';
import { useAppContext } from '../../../../context/AppContext';

function EngineView() {
    const { gameData, analysisEnabled, setAnalysisEnabled } = useAppContext();
    const [engineData, setEngineData] = useState<EngineData[]>([]);

    useEffect(() => {
        window.api.onEngineMessage((event, data) => {
            setEngineData(data.sort(sortEngineLines));
        });
    }, []);

    const onToggleEngine = (status: boolean) => {
        setAnalysisEnabled(status);
        if (status) {
            window.api.call('engine:eval', gameData.fen);
        } else {
            window.api.call('engine:stop');
        }
    };

    function sortEngineLines(line1: EngineData, line2: EngineData) {
        if (line1.score.unit === 'mate') {
            if (line2.score.unit === 'mate') {
                return line1.score.value <= line2.score.value ? 1 : -1;
            } else {
                return -1;
            }
        }
        if (line2.score.unit === 'mate') {
            return 1;
        }
        return line1.score.value <= line2.score.value ? 1 : -1;
    }

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
                <Toggle status={analysisEnabled} onChangeStatus={onToggleEngine} />
            </div>
            <div className="engine-view__lines">{renderEngineLines()}</div>
        </div>
    );
}

export default EngineView;
