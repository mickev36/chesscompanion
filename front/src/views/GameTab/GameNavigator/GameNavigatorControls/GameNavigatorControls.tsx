import React, { useCallback, useEffect } from 'react';
import './GameNavigatorControls.css';
import {
    MdFastRewind,
    MdArrowBack,
    MdArrowForward,
    MdFastForward,
    MdDelete,
    MdRotateLeft,
    MdSettings,
} from 'react-icons/md';
import { useAppContext } from '../../../../context/AppContext';

interface Props {
    toggleSettings: () => void;
}

function GameNavigatorControls({ toggleSettings }: Props) {
    const { gameData, setGameData, setRuntimeSettings, runtimeSettings } = useAppContext();

    const canGoToNextMove = gameData.selectedMove < gameData.moves.length;
    const canGoToPreviousMove = gameData.selectedMove > 0;

    const goToPreviousMove = useCallback(() => {
        if (canGoToPreviousMove)
            setGameData({ ...gameData, selectedMove: gameData.selectedMove - 1 });
    }, [gameData, setGameData, canGoToPreviousMove]);

    const goToNextMove = useCallback(() => {
        if (canGoToNextMove) setGameData({ ...gameData, selectedMove: gameData.selectedMove + 1 });
    }, [gameData, setGameData, canGoToNextMove]);

    const goToFirstMove = useCallback(() => {
        setGameData({ ...gameData, selectedMove: 0 });
    }, [gameData, setGameData]);

    const goToLastMove = useCallback(() => {
        setGameData({ ...gameData, selectedMove: gameData.moves.length });
    }, [gameData, setGameData]);

    const deleteFromHere = useCallback(() => {
        if (!window.confirm('Are you sure ?')) return;
        setGameData({
            ...gameData,
            moves: gameData.moves.slice(0, gameData.selectedMove),
        });
    }, [gameData, setGameData]);

    const rotateBoard = useCallback(() => {
        setRuntimeSettings({
            ...runtimeSettings,
            boardOrientation: !runtimeSettings.boardOrientation,
        });
    }, [runtimeSettings, setRuntimeSettings]);

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
            <div className="game-navigator__controls__arrows">
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
            <div className="game-navigator__controls__actions">
                <button onClick={deleteFromHere}>
                    <MdDelete />
                </button>
                <button onClick={rotateBoard}>
                    <MdRotateLeft />
                </button>
                <button onClick={toggleSettings}>
                    <MdSettings />
                </button>
            </div>
        </div>
    );
}

export default GameNavigatorControls;
