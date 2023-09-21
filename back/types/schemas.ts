import { ObjectSchema } from 'realm';

export const Game: ObjectSchema = {
    name: 'Game',
    primaryKey: 'id',
    properties: {
        id: 'objectId',
        moves: { type: 'list', objectType: 'Move' },
        whitePlayer: 'Player?',
        blackPlayer: 'Player?',
        site: 'string?',
        date: 'string?',
        event: 'string?',
        round: 'string?',
        result: 'GameResult',
        pgn: 'string',
    },
};

export const GameResult: ObjectSchema = {
    name: 'GameResult',
    embedded: true,
    properties: {
        winner: 'string',
        termination: 'string?',
    },
};

export const Player: ObjectSchema = {
    name: 'Player',
    embedded: true,
    properties: {
        name: 'string',
        title: 'string',
    },
};

export const Move: ObjectSchema = {
    name: 'Move',
    embedded: true,
    properties: {
        from: 'string',
        to: 'string',
        color: 'string',
        flags: 'string',
        piece: 'string',
        san: 'string',
        captured: 'string?',
        promotion: 'string?',
    },
};
