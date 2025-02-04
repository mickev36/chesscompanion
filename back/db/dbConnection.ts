import Realm from 'realm';
import { Game, Move, Player } from '../types/schemas';
import { app } from 'electron';

export let dbConnection: Realm;

export async function initDbConnection() {
    dbConnection = await Realm.open({
        path: app.getPath('appData') + '/chesscompaniondb',
        schema: [Game, Move, Player],
    });
    process.on('exit', function () {
        dbConnection.close();
    });
}

export async function closeDbConnection() {
    await dbConnection.close();
}

export async function purgeDatabase() {

    dbConnection.write(() => {
        const objects = dbConnection.objects('Game')
        dbConnection.delete(objects)
    });

    console.log("done")
}
