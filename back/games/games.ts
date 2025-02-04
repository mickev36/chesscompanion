import { Chess } from 'chess.js';
import { BSON } from 'realm';
import { dbConnection } from '../db/dbConnection';

export function getAllGames() {
    return dbConnection.objects('Game');
}

export function addGameFromPgn(pgn: string) {
    const game = pgnToGameData(pgn)
    addGame(game)
}

export function addGame(game) {
    console.log("****************")
    console.log(game)
    let task;
    let id = new BSON.ObjectId();
    dbConnection.write(() => {
        task = dbConnection.create('Game', { ...game, id });
    });
    return id;
}

export function deleteGame(id) {
    let success = false;
    dbConnection.write(() => {
        const game = dbConnection.objectForPrimaryKey('Game', new BSON.ObjectId(id));
        if (game) {
            success = true;
            dbConnection.delete(game);
        }
    });
    return success;
}

export function getGame(id: string) {
    return dbConnection.objectForPrimaryKey('Game', new BSON.ObjectId(id)).toJSON();
}

//TODO Handle game not found
export function updateGame(gameData) {
    const gameToUpdate = dbConnection.objectForPrimaryKey(
        'Game',
        new BSON.ObjectId(gameData.id)
    ) as any;

    return dbConnection.write(() => {
        Object.keys(gameData).forEach((key: string) => {
            if (key == 'id') return;
            gameToUpdate[key] = gameData[key];
        });
    });
}

export function loadPgnDb(file: Buffer) {
    // console.log(file.toString());
    // const pgnArray = file.toString().split('\n\n[');
    // const parsedPgn = [];
    // pgnArray.forEach(pgn => {
    //     pgn = '[' + pgn;
    //     parsedPgn.push(pgnToGameData(pgn));
    // });
    // return dbConnection.write(() => {
    //     parsedPgn.forEach(pgn => {
    //         dbConnection.create('Game', { ...pgn, id: new BSON.ObjectId() });
    //     });
    // });
}

function pgnToGameData(pgn: string) {
    const chessjs = new Chess();
    chessjs.loadPgn(pgn);
    const headers = chessjs.header();
    const moves = chessjs.history({ verbose: true });
    return {
        whitePlayer: {
            title: '' as any,
            name: headers.White || 'White',
        },
        blackPlayer: {
            title: '' as any,
            name: headers.Black || 'Black',
        },
        moves,
        event: headers.Event || '???',
        date: headers.Date || '???',
        site: headers.Site || '???',
        round: headers.Round || '???',
        selectedMove: moves.length,
        id: '',
        pgn,
        result: headers.Result || '???',
    };
}
