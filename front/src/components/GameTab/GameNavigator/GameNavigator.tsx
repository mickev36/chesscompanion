import React, { useCallback, useEffect } from 'react';
import { Move } from 'chess.js';
import './GameNavigator.css';
import { GameData, MoveWithVariants } from '../../../../../common/types/types';
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
    console.log('RENDER');
    console.log(gameData.moves);
    console.log(gameData.selectedMove);

    const canGoToNextMove = gameData.selectedMove[0] < gameData.moves.length;
    const canGoToPreviousMove = gameData.selectedMove[0] > 0;

    const goToPreviousMove = useCallback(() => {
        if (canGoToPreviousMove)
            setLoadedGameData({ ...gameData, selectedMove: [gameData.selectedMove[0] - 1] });
    }, [gameData, setLoadedGameData, canGoToPreviousMove]);

    const goToNextMove = useCallback(() => {
        if (canGoToNextMove)
            setLoadedGameData({ ...gameData, selectedMove: [gameData.selectedMove[0] + 1] });
    }, [gameData, setLoadedGameData, canGoToNextMove]);

    const goToFirstMove = useCallback(() => {
        setLoadedGameData({ ...gameData, selectedMove: [0] });
    }, [gameData, setLoadedGameData]);

    const goToLastMove = useCallback(() => {
        setLoadedGameData({ ...gameData, selectedMove: [gameData.moves.length] });
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

    function renderPieceIcon(move: Move) {
        const className = `piece-icon ${pieceMapping[move.piece as keyof typeof pieceMapping]} ${
            move.color
        }`;
        return <div className={className}></div>;
    }

    function renderFirstLevelMove(move: Move, moveNumber: number) {
        return (
            <div
                className={
                    gameData.selectedMove.length === 1 && gameData.selectedMove[0] === moveNumber
                        ? 'selected-move move'
                        : 'move'
                }
                onClick={() => onSelectMove([moveNumber])}
            >
                {renderPieceIcon(move)}
                {move.san}
            </div>
        );
    }

    function onSelectMove(selectedMove: number[]) {
        console.log('Selecting Move', selectedMove);
        setLoadedGameData({ ...gameData, selectedMove });
    }

    function renderVariant(variant: MoveWithVariants[], currentVariant: number[]) {
        return (
            <div className="variant">
                {variant.map((move, index) => {
                    const currentMovePath = [...currentVariant, index];
                    return (
                        <div
                            className={
                                gameData.selectedMove.join(' ') === currentMovePath.join(' ')
                                    ? 'variant-move selected-move'
                                    : 'variant-move'
                            }
                            onClick={() => {
                                onSelectMove(currentMovePath);
                            }}
                        >
                            {renderPieceIcon(move)}
                            {move.san}
                        </div>
                    );
                })}
            </div>
        );
    }

    function renderTurn(
        whiteMove: MoveWithVariants,
        blackMove: MoveWithVariants,
        moveNumber: number
    ) {
        return (
            <div key={moveNumber}>
                <div className="turn">
                    <div className="turn-counter">{(moveNumber + 2) / 2}.</div>
                    {renderFirstLevelMove(whiteMove, moveNumber)}
                    {blackMove ? (
                        !whiteMove.variants ? (
                            renderFirstLevelMove(blackMove, moveNumber + 1)
                        ) : (
                            <div className="move">...</div>
                        )
                    ) : (
                        <div></div>
                    )}
                </div>

                {/*White's move variants*/}
                {whiteMove.variants && renderVariants(whiteMove.variants, [moveNumber])}

                {/*Black's move variants if white doesn't have variants*/}
                {!whiteMove.variants &&
                    blackMove?.variants &&
                    renderVariants(blackMove.variants, [moveNumber + 1])}

                {/*Black Move if white has variants*/}
                {whiteMove.variants && blackMove && (
                    <div className="turn">
                        <div className="turn-counter">{(moveNumber + 2) / 2}.</div>
                        <div className="move">...</div>
                        {renderFirstLevelMove(blackMove, moveNumber + 1)}
                    </div>
                )}
                {/*Black's move variants if white has variants*/}
                {whiteMove.variants &&
                    blackMove?.variants &&
                    renderVariants(blackMove.variants, [moveNumber + 1])}
            </div>
        );
    }

    function renderVariants(variants: MoveWithVariants[][], currentVariant: number[]) {
        return variants.map((variant, index) => {
            return renderVariant(variant, [...currentVariant, index]);
        });
    }

    function renderTurns(moves: MoveWithVariants[]) {
        let output = [];
        for (let i = 0; i < moves.length; i += 2) {
            output.push(renderTurn(moves[i], moves[i + 1], i));
        }
        return <div className="navigator-moves">{output}</div>;
    }

    return (
        <div className="game-navigator">
            {renderTurns(gameData.moves)}
            <div className="navigator-controls">
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
