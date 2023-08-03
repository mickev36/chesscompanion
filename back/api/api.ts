import { addGame, deleteGame, getAllGames, getGame, updateGame } from '../games/games';
import { initEngine, engineEval, engineStop } from '../engine/engine';
import { ipcMain } from 'electron';
import { getSettings, setSettings } from '../settings/settings';
import { rendererWindow } from '../renderer/renderer';

export async function initApi() {
    await initEngine();
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

    ipcMain.handle('engine:eval', async (event, FEN) => {
        const evalStream = await engineEval(FEN);
        evalStream.on('data', evalData => {
            rendererWindow.send('engineData', evalData);
        });
    });

    ipcMain.handle('engine:stop', async (event, FEN) => {
        engineStop();
    });

    ipcMain.handle('settings:set', async (event, settings) => {
        setSettings(settings);
    });
}
