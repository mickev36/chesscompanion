import { addGame, deleteGame, getAllGames, getGame, updateGame } from '../games/games';
import { importGames } from '../games/import';
import { initEngine, infiniteAnalysis, engineStop, setAnalysisLineCount } from '../engine/engine';
import { ipcMain } from 'electron';
import { getConfig, setSettings } from '../config/config';

export async function initApi() {
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

    ipcMain.handle('game:import', async (event, path) => {
        importGames(path);
    })

    ipcMain.handle('game:add', async (event, gameData) => {
        const insertedId = addGame(gameData);
        return insertedId;
    });

    ipcMain.handle('engine:updatePath', async (event, enginePath) => {
        setSettings({ engine: { path: enginePath } });
        initEngine();
    });

    ipcMain.handle('engine:start', async (event, FEN) => {
        infiniteAnalysis(FEN, true);
    });

    ipcMain.handle('engine:position', async (event, FEN) => {
        infiniteAnalysis(FEN, false);
    });

    ipcMain.handle('engine:setAnalysisLineCount', async (event, count) => {
        setAnalysisLineCount(count)
    });

    ipcMain.handle('engine:stop', async (event, FEN) => {
        engineStop();
    });

    ipcMain.handle('config:set', async (event, settings) => {
        setSettings(settings);
    });

    ipcMain.handle('config:get', async event => {
        return getConfig();
    });
}
