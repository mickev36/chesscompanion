import React, { useEffect, useState } from 'react';

import './EngineView.css';
import { EngineData } from '../../../../../../common/types/types';
import Toggle from '../../../../components/Toggle/Toggle';
import { useAppContext } from '../../../../context/AppContext';
import { Chess, Square } from 'chess.js';

function EngineView() {
    const { config } = useAppContext();
    const { gameData, analysisEnabled, setAnalysisEnabled, currentPosition } = useAppContext();
    const [engineData, setEngineData] = useState<EngineData[]>([]);

    useEffect(() => {
        window.api.onEngineMessage((event, data) => {
            setEngineData(data.sort(sortEngineLines));
        });
    }, []);

    const onToggleEngine = (status: boolean) => {
        setAnalysisEnabled(status);
        if (status) {
            window.api.call('engine:eval', currentPosition.fen());
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
        return engineData.map((engineLine, engineLineIndex) => {
            const chess = new Chess();
            chess.load(currentPosition.fen());
            const currentMoveCount = currentPosition.history().length;
            const moves = engineLine.pv.split(' ');
            const continuation = moves
                .map((moveString, index) => {
                    let output = '';
                    const turn = chess.turn();
                    chess.move({
                        from: (moveString[0] + moveString[1]) as Square,
                        to: (moveString[2] + moveString[3]) as Square,
                    });
                    const history = chess.history();
                    const move = history[history.length - 1];

                    if (turn === 'b') {
                        if (index === 0)
                            output += Math.ceil((currentMoveCount + index) / 2) + '...';
                    } else {
                        output += Math.ceil((currentMoveCount + index) / 2) + 1 + '. ';
                    }
                    output += move;
                    return output;
                })
                .join(' ');

            return (
                <span key={engineLineIndex} className="engine-line">
                    {engineLine.score.unit === 'mate' ? 'M' : ''}
                    {engineLine.score.unit === 'cp' && engineLine.score.value > 0 ? '+' : ''}
                    {engineLine.score.unit === 'mate'
                        ? engineLine.score.value
                        : (engineLine.score.value / 100).toFixed(1)}{' '}
                    {continuation}
                </span>
            );
        });
    };

    const renderEvaluation = () => {
        if (engineData.length === 0) return '';
        const bestLine = engineData[0];
        return `${bestLine.score.unit === 'mate' ? 'M' : ''}${
            bestLine.score.unit === 'cp' && engineData[0].score.value > 0 ? '+' : ''
        }${
            bestLine.score.unit === 'mate'
                ? bestLine.score.value
                : (bestLine.score.value / 100).toFixed(1)
        }`;
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
                <div className="engine-view__eval">{analysisEnabled && renderEvaluation()}</div>
                <Toggle status={analysisEnabled} onChangeStatus={onToggleEngine} />
            </div>
            <div className="engine-view__lines">{analysisEnabled && renderEngineLines()}</div>
        </div>
    );
}

export default EngineView;
