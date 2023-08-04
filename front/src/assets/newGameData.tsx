import { Chess } from 'chess.js';
import { GameDataState } from '../../../common/types/types';

export const newGameData: GameDataState = {
    id: '',
    whitePlayer: {
        name: 'White',
        title: '',
    },
    blackPlayer: {
        name: 'Black',
        title: '',
    },
    moves: [],
    boardOrientation: true,
    selectedMove: 0,
    pgn: '',
    site: '',
    date: '',
    event: '',
    round: '',
    result: '',
    currentPosition: new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'),
};
