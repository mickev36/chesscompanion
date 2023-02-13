import { addGame, deleteGame, getAllGames, getGame, updateGame } from '../games/games';
import { ipcMain } from 'electron';

export function initApi() {
    ipcMain.handle('games:getall', async event => {
        return getAllGames()
            .toJSON()
            .map(game => {
                return { ...game, id: game.id.toString() };
            });
    });

    ipcMain.handle('game:get', async (event, gameId) => {
        const game = getGame(gameId);
        game.id = game.id.toString();
        return game;
    });

    ipcMain.handle('game:delete', async (event, gameId) => {
        deleteGame(gameId);
    });

    ipcMain.handle('game:update', async (event, gameData) => {
        updateGame(gameData);
    });

    ipcMain.handle('game:add', async (event, gameData) => {
        const insertedId = addGame(gameData);
        return insertedId;
    });
}
