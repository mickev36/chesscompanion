import React, { useCallback, useEffect } from 'react';
import { Move } from 'chess.js';
import { GameData } from '../../../../../../common/types/types';
import './GameNavigatorMoveList.css';

const pieceMapping = {
    p: 'pawn',
    q: 'queen',
    r: 'rook',
    k: 'king',
    n: 'knight',
    b: 'bishop',
};

interface Props {
    gameData: GameData;
    setLoadedGameData: (gameData: GameData) => void;
}

function GameNavigatorMoveList({ gameData, setLoadedGameData }: Props) {
    function formatMove(move: Move | undefined) {
        if (!move) return <></>;

        //Print move's piece icon
        const className = `piece-icon ${pieceMapping[move.piece as keyof typeof pieceMapping]} ${
            move.color
        }`;

        return (
            <>
                <div className={className}></div>
                {move.san}
            </>
        );
    }

    function onRewind(id: number) {
        setLoadedGameData({ ...gameData, selectedMove: id });
    }

    function formatMoves(moves: Move[]) {
        let output = [];
        let data = [...moves];
        for (let turnCounter = 1; data.length; ++turnCounter) {
            output.push(
                <li key={turnCounter}>
                    <div className="turn-counter">{turnCounter}.</div>
                    <div
                        className={
                            gameData.selectedMove === 2 * turnCounter - 1
                                ? 'selected-move move'
                                : 'move'
                        }
                        onClick={() => onRewind(2 * turnCounter - 1)}
                    >
                        {formatMove(data.shift())}
                    </div>
                    {data[0] && (
                        <div
                            className={
                                gameData.selectedMove === 2 * turnCounter
                                    ? 'selected-move move'
                                    : 'move'
                            }
                            onClick={() => onRewind(2 * turnCounter)}
                        >
                            {data.length > 0 && formatMove(data.shift())}
                        </div>
                    )}
                </li>
            );
        }
        return <ul>{output}</ul>;
    }

    return <div className="game-navigator__move-list">{formatMoves(gameData.moves)}</div>;
}

export default GameNavigatorMoveList;
