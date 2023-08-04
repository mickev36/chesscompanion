import React from 'react';
import { newGameData } from '../../../assets/newGameData';
import { pgnToGameData } from '../../../services/gameDataPgnConversion';
import { FaPlus, FaSave } from 'react-icons/fa';
import './GameMetaData.css';
import { useAppContext } from '../../../context/AppContext';

function GameMetaData() {
    const { gameData, setGameData } = useAppContext();

    function changePlayerName(color: 'b' | 'w', name: string) {
        let gameDataUpdated = { ...gameData };
        if (color === 'w') {
            gameDataUpdated.whitePlayer.name = name;
        } else {
            gameDataUpdated.blackPlayer.name = name;
        }
        setGameData(gameDataUpdated);
    }

    function onNewGame() {
        setGameData(newGameData);
    }

    async function onSaveLoadedGame() {
        if (gameData.id === '') {
            //Save new game
            const insertedGameId = await window.api.call('game:add', gameData);
            setGameData({ ...gameData, id: insertedGameId });
        } else {
            //Update Game
            await window.api.call('game:update', gameData);
        }
    }

    function setSite(inputEvent: React.ChangeEvent<HTMLInputElement>) {
        setGameData({ ...gameData, site: inputEvent.target.value });
    }

    function setEvent(inputEvent: React.ChangeEvent<HTMLInputElement>) {
        setGameData({ ...gameData, event: inputEvent.target.value });
    }

    function setDate(inputEvent: React.ChangeEvent<HTMLInputElement>) {
        setGameData({ ...gameData, date: inputEvent.target.value });
    }

    function setRound(inputEvent: React.ChangeEvent<HTMLInputElement>) {
        setGameData({ ...gameData, round: inputEvent.target.value });
    }

    function onChangeGamePgn(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setGameData(pgnToGameData(event.target.value));
    }

    return (
        <div className="game-meta-data">
            <div className="player-info">
                <textarea
                    className="white-player"
                    rows={Math.ceil(gameData.whitePlayer.name.length / 12)}
                    value={gameData.whitePlayer.name}
                    onChange={event => {
                        changePlayerName('w', event.target.value);
                    }}
                />
                <textarea
                    className="black-player"
                    value={gameData.blackPlayer.name}
                    rows={Math.ceil(gameData.blackPlayer.name.length / 12)}
                    onChange={event => {
                        changePlayerName('b', event.target.value);
                    }}
                />
            </div>
            <div className="text-info">
                Site
                <input type="text" value={gameData.site} onChange={setSite} />
                Event
                <input type="text" value={gameData.event} onChange={setEvent} />
                Date
                <input type="text" value={gameData.date} onChange={setDate} />
                Round
                <input type="text" value={gameData.round} onChange={setRound} />
                PGN
                <textarea rows={4} value={gameData.pgn} onChange={onChangeGamePgn} />
                FEN
                <textarea rows={4} value={gameData.fen} readOnly />
            </div>
            <div className="actions">
                <button onClick={onNewGame}>
                    <FaPlus />
                    New game
                </button>
                <button onClick={onSaveLoadedGame}>
                    <FaSave />
                    Save game
                </button>
            </div>
        </div>
    );
}

export default GameMetaData;
