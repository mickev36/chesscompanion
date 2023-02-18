import { GameData } from '../../../common/types/types';

export const newGameData: GameData = {
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
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    site: '',
    date: '',
    event: '',
    round: '',
    result: '',
};
