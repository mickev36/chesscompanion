import React, { useCallback, useEffect } from 'react';
import './GameNavigatorControls.css';
import { MdFastRewind, MdArrowBack, MdArrowForward, MdFastForward } from 'react-icons/md';
import { GameData } from '../../../../../../common/types/types';

interface Props {
    gameData: GameData;
    setLoadedGameData: (gameData: GameData) => void;
}

function GameNavigatorControls({ gameData, setLoadedGameData }: Props) {
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

    return (
        <div className="game-navigator__controls">
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
    );
}

export default GameNavigatorControls;
