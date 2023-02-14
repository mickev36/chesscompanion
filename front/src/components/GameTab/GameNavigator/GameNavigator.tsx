import React, { useCallback, useEffect } from 'react';
import { Move } from 'chess.js';
import './GameNavigator.css';
import { GameData } from '../../../../../common/types/types';
import { MdFastRewind, MdArrowBack, MdArrowForward, MdFastForward } from 'react-icons/md';

interface Props {
    gameData: GameData;
    setLoadedGameData: (gameData: GameData) => void;
}

const pieceMapping = {
    p: 'pawn',
    q: 'queen',
    r: 'rook',
    k: 'king',
    n: 'knight',
    b: 'bishop',
};

function GameNavigator({ gameData, setLoadedGameData }: Props) {
    const canGoToNextMove = gameData.selectedMove < gameData.moves.length;
    const canGoToPreviousMove = gameData.selectedMove > 0;

    const goToPreviousMove = useCallback(() => {
        if (canGoToPreviousMove)
            setLoadedGameData({ ...gameData, selectedMove: gameData.selectedMove - 1 });
    }, [gameData, setLoadedGameData, canGoToPreviousMove]);

    const goToNextMove = useCallback(() => {
        if (canGoToNextMove)
            setLoadedGameData({ ...gameData, selectedMove: gameData.selectedMove + 1 });
    }, [gameData, setLoadedGameData, canGoToNextMove]);

    const goToFirstMove = useCallback(() => {
        setLoadedGameData({ ...gameData, selectedMove: 0 });
    }, [gameData, setLoadedGameData]);

    const goToLastMove = useCallback(() => {
        setLoadedGameData({ ...gameData, selectedMove: gameData.moves.length });
    }, [gameData, setLoadedGameData]);

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.key === 'ArrowLeft') goToPreviousMove();
            else if (event.key === 'ArrowRight') goToNextMove();
            else if (event.key === 'ArrowUp') goToFirstMove();
            else if (event.key === 'ArrowDown') goToLastMove();
        };
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [goToPreviousMove, goToNextMove, goToFirstMove, goToLastMove]);

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

    return (
        <div className="move-history">
            <div className="history-navigator">{formatMoves(gameData.moves)}</div>
            <div className="history-controls">
                <button disabled={!canGoToPreviousMove} onClick={goToFirstMove}>
                    <MdFastRewind />
                </button>
                <button disabled={!canGoToPreviousMove} onClick={goToPreviousMove}>
                    <MdArrowBack />
                </button>
                <button disabled={!canGoToNextMove} onClick={goToNextMove}>
                    <MdArrowForward />
                </button>
                <button disabled={!canGoToNextMove} onClick={goToLastMove}>
                    <MdFastForward />
                </button>
            </div>
        </div>
    );
}

export default GameNavigator;
