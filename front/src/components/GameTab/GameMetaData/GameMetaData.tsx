import React from 'react';
import { GameData } from '../../../../../common/types/types';
import { newGameData } from '../../../assets/newGameData';
import { pgnToGameData } from '../../../services/gameDataPgnConversion';
import { FaPlus, FaSave } from 'react-icons/fa';
import './GameMetaData.css';

interface Props {
    setLoadedGameData: (gameData: GameData) => void;
    loadedGameData: GameData;
}

function GameMetaData({ loadedGameData, setLoadedGameData }: Props) {
    function changePlayerName(color: 'b' | 'w', name: string) {
        let gameDataUpdated = { ...loadedGameData };
        if (color === 'w') {
            gameDataUpdated.whitePlayer.name = name;
        } else {
            gameDataUpdated.blackPlayer.name = name;
        }
        setLoadedGameData(gameDataUpdated);
    }

    function onNewGame() {
        setLoadedGameData(newGameData);
    }

    async function onSaveLoadedGame() {
        if (loadedGameData.id === '') {
            //Save new game
            const insertedGameId = await window.api.call('game:add', loadedGameData);
            setLoadedGameData({ ...loadedGameData, id: insertedGameId });
        } else {
            //Update Game
            await window.api.call('game:update', loadedGameData);
        }
    }

    function setSite(inputEvent: React.ChangeEvent<HTMLInputElement>) {
        setLoadedGameData({ ...loadedGameData, site: inputEvent.target.value });
    }

    function setEvent(inputEvent: React.ChangeEvent<HTMLInputElement>) {
        setLoadedGameData({ ...loadedGameData, event: inputEvent.target.value });
    }

    function setDate(inputEvent: React.ChangeEvent<HTMLInputElement>) {
        setLoadedGameData({ ...loadedGameData, date: inputEvent.target.value });
    }

    function setRound(inputEvent: React.ChangeEvent<HTMLInputElement>) {
        setLoadedGameData({ ...loadedGameData, round: inputEvent.target.value });
    }

    function onChangeGamePgn(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setLoadedGameData(pgnToGameData(event.target.value));
    }

    return (
        <div className="game-meta-data">
            <div className="player-info">
                <textarea
                    className="white-player"
                    rows={Math.ceil(loadedGameData.whitePlayer.name.length / 12)}
                    value={loadedGameData.whitePlayer.name}
                    onChange={event => {
                        changePlayerName('w', event.target.value);
                    }}
                />
                <textarea
                    className="black-player"
                    value={loadedGameData.blackPlayer.name}
                    rows={Math.ceil(loadedGameData.blackPlayer.name.length / 12)}
                    onChange={event => {
                        changePlayerName('b', event.target.value);
                    }}
                />
            </div>
            <div className="text-info">
                Site
                <input type="text" value={loadedGameData.site} onChange={setSite} />
                Event
                <input type="text" value={loadedGameData.event} onChange={setEvent} />
                Date
                <input type="text" value={loadedGameData.date} onChange={setDate} />
                Round
                <input type="text" value={loadedGameData.round} onChange={setRound} />
                PGN
                <textarea rows={4} value={loadedGameData.pgn} onChange={onChangeGamePgn} />
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
