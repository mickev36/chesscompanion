import { GameData } from '../types/types';

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
    selectedMove: 0,
    pgn: '',
    site: '',
    date: '',
    event: '',
    round: '',
    result: { winner: '*' },
};
