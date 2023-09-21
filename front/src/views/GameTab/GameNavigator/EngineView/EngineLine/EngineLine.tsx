import React from 'react';

import './EngineLine.css';
import { EngineData } from '../../../../../types/types';
import { useAppContext } from '../../../../../context/AppContext';
import { Chess, Square } from 'chess.js';
import renderEvaluation from '../renderEvaluation';

interface Props {
    engineLine: EngineData;
}

function EngineLine({ engineLine }: Props) {
    const { currentPosition } = useAppContext();

    function renderLine() {
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
                    if (index === 0) output += Math.ceil((currentMoveCount + index) / 2) + '...';
                } else {
                    output += Math.ceil((currentMoveCount + index) / 2) + 1 + '. ';
                }
                output += move;
                return output;
            })
            .join(' ');

        return renderEvaluation(currentPosition.turn(), engineLine) + ' ' + continuation;
    }

    return <span className="engine-line">{renderLine()}</span>;
}

export default EngineLine;
