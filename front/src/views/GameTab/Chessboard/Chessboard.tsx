import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './Chessboard.css';
import { Move, Square } from 'chess.js';
import ChessgroundWrapper from './ChessgroundWrapper';
import * as cgTypes from 'chessground/types';
import PromotionPanel, { PromotionData } from './PromotionPanel/PromotionPanel';
import { useAppContext } from '../../../context/AppContext';

function Chessboard() {
    const { gameData, setGameData, currentPosition, runtimeSettings } = useAppContext();

    const [promotionData, setPromotionData] = useState<PromotionData | null>(null);

    const chessboardRef = useRef<HTMLDivElement>(null);

    const lastMoveSquares = useMemo(() => {
        const lastMove = currentPosition.history({ verbose: true }).at(-1);
        if (!lastMove) return undefined;
        return [lastMove.from as cgTypes.Key, lastMove.to as cgTypes.Key];
    }, [currentPosition]);

    //Generate the list of legal moves
    const legalMoves = currentPosition.moves({ verbose: true }).reduce((acc: any, move) => {
        if (acc.has(move.from)) acc.set(move.from, [...acc.get(move.from), move.to]);
        else acc.set(move.from, [move.to]);
        return acc;
    }, new Map<cgTypes.Key, cgTypes.Key[]>());

    function moveHandler(orig: cgTypes.Key, dest: cgTypes.Key, capturedPiece?: cgTypes.Piece) {
        const from = orig as Square;
        const to = dest as Square;

        if (checkPromotion(from, to)) {
            //Promoting
            setPromotionData({
                color: currentPosition.turn(),
                move: { from, to },
                selectedPiece: null,
            });
        } else {
            let parsedMove = currentPosition.move({ from, to });

            if (parsedMove) {
                saveMove(parsedMove);
            }
        }
    }

    const saveMove = useCallback(
        (parsedMove: Move) => {
            setGameData({
                ...gameData,
                selectedMove: gameData.moves.length + 1,
                moves: [...gameData.moves, parsedMove],
                pgn: currentPosition.pgn(),
            });
        },
        [gameData, setGameData, currentPosition]
    );

    function checkPromotion(from: Square, to: Square) {
        const beforeMove = currentPosition.get(from);
        return (
            beforeMove?.type === 'p' &&
            ((beforeMove.color === 'w' && from[1] === '7' && to[1] === '8') ||
                (beforeMove.color === 'b' && from[1] === '2' && to[1] === '1'))
        );
    }

    //Handle piece selection for promotion
    useEffect(() => {
        if (promotionData && promotionData.selectedPiece) {
            let parsedMove;
            let from = promotionData.move.from,
                to = promotionData.move.to,
                piece = promotionData.selectedPiece;
            if (currentPosition.get(promotionData.move.to) != null) {
                //Promotion while capturing a piece
                parsedMove = currentPosition.move(`${from[0]}x${to}=${piece}`);
            } else parsedMove = currentPosition.move(`${to}=${piece}`);
            if (parsedMove) {
                saveMove(parsedMove);
                setPromotionData(null);
            }
        }
    }, [promotionData, saveMove, currentPosition]);
    return (
        <div className="chessboard" ref={chessboardRef}>
            {promotionData && (
                <PromotionPanel
                    setPromotionData={setPromotionData}
                    promotionData={promotionData}
                    ref={chessboardRef}
                />
            )}

            <ChessgroundWrapper
                config={{
                    viewOnly:
                        (gameData.moves.length !== 0 &&
                            gameData.selectedMove !== gameData.moves.length) ||
                        gameData.result !== '*',
                    fen: currentPosition.fen(),
                    coordinates: false,
                    lastMove: lastMoveSquares,
                    check: currentPosition.inCheck(),
                    turnColor: currentPosition.turn() === 'w' ? 'white' : 'black',
                    movable: {
                        free: false,
                        dests: legalMoves,
                        showDests: true,
                    },
                    highlight: {
                        lastMove: true,
                        check: true,
                    },
                    events: {
                        move: moveHandler,
                    },
                    orientation: runtimeSettings.boardOrientation ? 'white' : 'black',
                }}
            />
        </div>
    );
}

export default Chessboard;
