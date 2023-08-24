import React, { useEffect, useState } from 'react';

import './EngineView.css';
import { EngineData } from '../../../../../../common/types/types';
import Toggle from '../../../../components/Toggle/Toggle';
import { useAppContext } from '../../../../context/AppContext';
import { Chess, Square } from 'chess.js';

function EngineView() {
    const { config } = useAppContext();
    const { analysisEnabled, setAnalysisEnabled, currentPosition } = useAppContext();
    const [engineData, setEngineData] = useState<EngineData[]>([]);

    useEffect(() => {
        window.api.onEngineMessage((event, data) => {
            setEngineData(data.sort(sortEngineLines));
        });
    }, []);

    const onToggleEngine = (status: boolean) => {
        setAnalysisEnabled(status);
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
            console.log(continuation);
            return (
                <span key={engineLineIndex} className="engine-line">
                    {renderEvaluation(currentPosition.turn(), engineLine)} {continuation}
                </span>
            );
        });
    };

    const renderEvaluation = (playerToMove: 'w' | 'b', engineData: EngineData) => {
        if (engineData.score.unit === 'mate') return 'M' + engineData.score.value;
        else if (engineData.score.unit === 'cp') {
            //UCI specifies the evaluation from the player's point of view
            let sign = '';
            const evalValue = engineData.score.value;
            if ((evalValue > 0 && playerToMove === 'w') || (evalValue < 0 && playerToMove === 'b'))
                sign = '+';
            else sign = '-';

            return sign + Math.abs(evalValue / 100).toFixed(1);
        }
    };

    const renderBestEvaluation = () => {
        if (currentPosition.game_over()) return '-';
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
                <div className="engine-view__eval">{analysisEnabled && renderBestEvaluation()}</div>
                <Toggle status={analysisEnabled} onChangeStatus={onToggleEngine} />
            </div>
            <div className="engine-view__lines">
                {!currentPosition.game_over() && analysisEnabled && renderEngineLines()}
            </div>
        </div>
    );
}

export default EngineView;
