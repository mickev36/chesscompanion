import React, { useEffect, useState } from 'react';
import { GameData } from '../../../../common/types/types';
import { FaFolderOpen, FaTrash } from 'react-icons/fa';
import './DatabaseExplorer.css';

interface Props {
    setLoadedGameData: (gameData: GameData) => void;
    loadedGameId: string;
    changeTab: (index: number) => void;
}

function DatabaseExplorer({ setLoadedGameData, loadedGameId, changeTab }: Props) {
    const [games, setGames] = useState<GameData[]>([]);

    useEffect(() => {
        fetchGames();
    }, [loadedGameId]);

    async function fetchGames() {
        const games = await window.api.call('games:getall');
        setGames(games);
    }

    async function deleteGame(gameId: string) {
        await window.api.call('game:delete', gameId);
        fetchGames();
    }

    async function onLoadGame(gameId: string) {
        const gameData = await window.api.call('game:get', gameId);
        changeTab(0);
        setLoadedGameData({ ...gameData, selectedMove: gameData.moves.length });
    }

    function renderAbreviatedPgn(game: GameData) {
        if (!game.pgn) return '';
        const splitted = game.pgn.split('\n\n');
        return splitted[1] ? splitted[1].substring(0, 20) : splitted[0].substring(0, 20);
    }

    return (
        <div className="database-explorer">
            <table>
                <thead>
                    <tr>
                        <td>White</td>
                        <td>Black</td>
                        <td>Pgn</td>
                        <td>Result</td>
                        <td>Date</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {games.map(game => {
                        return (
                            <tr key={game.id}>
                                <td>{game.whitePlayer?.name || 'White'}</td>
                                <td>{game.blackPlayer?.name || 'Black'}</td>
                                <td>{renderAbreviatedPgn(game)}</td>
                                <td>{game.result || '*'}</td>
                                <td>{game.date || '?'}</td>
                                <td>
                                    <button
                                        onClick={() => {
                                            onLoadGame(game.id);
                                        }}
                                    >
                                        <FaFolderOpen />
                                        Load
                                    </button>
                                    <button
                                        onClick={() => {
                                            deleteGame(game.id);
                                        }}
                                    >
                                        <FaTrash />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DatabaseExplorer;
