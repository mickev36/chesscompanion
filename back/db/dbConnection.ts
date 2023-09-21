import Realm from 'realm';
import { Game, GameResult, Move, Player } from '../types/schemas';
import { app } from 'electron';

export let dbConnection: Realm;

export async function initDbConnection() {
    dbConnection = await Realm.open({
        path: app.getPath('appData') + '/chesscompaniondb',
        schema: [Game, Move, Player, GameResult],
    });
    process.on('exit', function () {
        dbConnection.close();
    });
}

export async function closeDbConnection() {
    await dbConnection.close();
}
