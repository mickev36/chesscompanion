import { ShortMove } from 'chess.js';
import React, { useCallback, useEffect, useState } from 'react';
import './PromotionPanel.css';

export interface PromotionData {
    move: ShortMove;
    color: 'b' | 'w';
    selectedPiece: PromotionPiece;
}

type PromotionPiece = 'Q' | 'R' | 'N' | 'B' | null;

interface Props {
    promotionData: PromotionData;
    setPromotionData: (promotionData: PromotionData) => void;
}

function columnLetterToNumber(letter: string) {
    return letter.charCodeAt(0) - 97;
}

const PromotionPanel = React.forwardRef(
    ({ promotionData, setPromotionData }: Props, chessboardRef: any) => {
        const [promotionPanelData, setPromotionPanelData] = useState<any>({
            colorPromoting: 'w',
            x: 0,
            y: 0,
            squareSize: 0,
        });

        const updatePromotionPanelData = useCallback(() => {
            const renderedBoardData = chessboardRef.current?.getBoundingClientRect() || {
                colorPromoting: 'w',
                x: 0,
                y: 0,
                width: 0,
            };

            const promotionColumnNumber = columnLetterToNumber(promotionData.move.to[0]);

            setPromotionPanelData({
                colorPromoting: promotionData.color,
                x: renderedBoardData.x + promotionColumnNumber * (renderedBoardData.width / 8),
                y: renderedBoardData.y,
                squareSize: renderedBoardData.width / 8,
            });
        }, [chessboardRef, promotionData.color]);

        useEffect(() => {
            updatePromotionPanelData();
        }, [updatePromotionPanelData]);

        useEffect(() => {
            window.addEventListener('resize', updatePromotionPanelData);
        }, [updatePromotionPanelData]);

        const top =
            promotionPanelData.y +
            (promotionPanelData.colorPromoting === 'b' ? promotionPanelData.squareSize * 4 : 0);

        const styles: React.CSSProperties = {
            left: promotionPanelData.x,
            width: promotionPanelData.squareSize,
            top: top,
        };

        function promoteTo(piece: PromotionPiece) {
            setPromotionData({ ...promotionData, selectedPiece: piece });
        }

        return (
            <div className="promotion-panel" style={styles}>
                <div
                    onClick={() => promoteTo('Q')}
                    className={'piece-icon queen ' + promotionPanelData.colorPromoting}
                ></div>
                <div
                    onClick={() => promoteTo('N')}
                    className={'piece-icon knight ' + promotionPanelData.colorPromoting}
                ></div>
                <div
                    onClick={() => promoteTo('R')}
                    className={'piece-icon rook ' + promotionPanelData.colorPromoting}
                ></div>
                <div
                    onClick={() => promoteTo('B')}
                    className={'piece-icon bishop ' + promotionPanelData.colorPromoting}
                ></div>
            </div>
        );
    }
);

export default PromotionPanel;
