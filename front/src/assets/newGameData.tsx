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
    site: '',
    date: '',
    event: '',
    round: '',
    result: '',
};
