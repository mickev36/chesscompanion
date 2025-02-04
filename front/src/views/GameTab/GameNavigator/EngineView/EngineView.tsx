import React, { useEffect, useState } from 'react';

import './EngineView.css';
import { EngineData } from '../../../../types/types';
import Toggle from '../../../../components/Toggle/Toggle';
import { useAppContext } from '../../../../context/AppContext';
import renderEvaluation from './renderEvaluation';
import EngineLine from './EngineLine/EngineLine';

function EngineView() {
    const { config } = useAppContext();
    const { runtimeSettings, setRuntimeSettings, currentPosition } = useAppContext();
    const [engineData, setEngineData] = useState<EngineData[]>([]);

    useEffect(() => {
        window.api.onEngineMessage((event, data) => {
            setEngineData(data.sort(sortEngineLines));
        });
    }, []);

    const onToggleEngine = (status: boolean) => {
        setRuntimeSettings({ ...runtimeSettings, analysisEnabled: status });
        if (status) {
            window.api.call('engine:start', currentPosition.fen());
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

    const renderBestEvaluation = () => {
        if (currentPosition.isGameOver()) return '-';
        if (engineData.length === 0) return '';
        const bestLine = engineData[0];

        return renderEvaluation(currentPosition.turn(), bestLine);
    };

    if (!config.engine.status) {
        return (
            <div className="engine-view">
                <div className="engine-view__meta">No analysis engine detected.</div>
            </div>
        );
    }

    return (
        <div className="engine-view">
            <div className="engine-view__meta">{config.engine.name}</div>

            <div className="engine-view__overview">
                <div className="engine-view__eval">
                    {runtimeSettings.analysisEnabled && renderBestEvaluation()}
                </div>
                <Toggle status={runtimeSettings.analysisEnabled} onChangeStatus={onToggleEngine} />
            </div>
            <div className="engine-view__lines">
                {!currentPosition.isGameOver() &&
                    runtimeSettings.analysisEnabled &&
                    engineData.map((engineLine, engineLineIndex) => {
                        return <EngineLine key={engineLineIndex} engineLine={engineLine} />;
                    })}
            </div>
        </div>
    );
}

export default EngineView;
