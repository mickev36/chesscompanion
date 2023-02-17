import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Chessboard.css';
import { Chess, ChessInstance, Move, Square } from 'chess.js';
import ChessgroundWrapper from './ChessgroundWrapper';
import * as cgTypes from 'chessground/types';
import { gameDataToPgn } from '../../../services/gameDataPgnConversion';
import { GameData } from '../../../../../common/types/types';
import PromotionPanel, { PromotionData } from './PromotionPanel/PromotionPanel';

interface Props {
    setLoadedGameData: (gameData: GameData) => void;
    gameData: GameData;
}

function Chessboard({ setLoadedGameData, gameData }: Props) {
    const [chess] = useState<ChessInstance>(
        new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    );

    const [promotionData, setPromotionData] = useState<PromotionData | null>(null);

    const chessboardRef = useRef<HTMLDivElement>(null);

    // Reset chess.js to selected turn
    chess.load_pgn(gameDataToPgn(gameData));

    //Generate the list of legal moves
    const legalMoves = chess.moves({ verbose: true }).reduce((acc: any, move) => {
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
                color: chess.turn(),
                move: { from, to },
                selectedPiece: null,
            });
        } else {
            let parsedMove = chess.move({ from, to });

            if (parsedMove) {
                saveMove(parsedMove);
            }
        }
    }

    const saveMove = useCallback(
        (parsedMove: Move) => {
            const pgn = chess.pgn();
            setLoadedGameData({
                ...gameData,
                selectedMove: gameData.moves.length + 1,
                moves: [...gameData.moves, parsedMove],
                pgn,
            });
        },
        [chess, gameData, setLoadedGameData]
    );

    function checkPromotion(from: Square, to: Square) {
        const beforeMove = chess.get(from);
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
            if (chess.get(promotionData.move.to) != null) {
                //Promotion while capturing a piece
                parsedMove = chess.move(`${from[0]}x${to}=${piece}`);
            } else parsedMove = chess.move(`${to}=${piece}`);
            if (parsedMove) {
                saveMove(parsedMove);
                setPromotionData(null);
            }
        }
    }, [promotionData, chess, saveMove]);

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
                        gameData.moves.length !== 0 &&
                        gameData.selectedMove !== gameData.moves.length,
                    fen: chess.fen(),
                    coordinates: false,
                    check: chess.in_check(),
                    turnColor: chess.turn() === 'w' ? 'white' : 'black',
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
                    orientation: gameData.boardOrientation ? 'white' : 'black',
                }}
            />
        </div>
    );
}

export default Chessboard;
