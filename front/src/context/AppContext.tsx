import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppConfig, GameData, RuntimeSettings } from '../types/types';
import { newGameData } from '../assets/newGameData';
import { Chess, ChessInstance } from 'chess.js';
import { gameDataToPgn } from '../services/gameDataPgnConversion';
import { defaultRuntimeSettings } from './defaultRuntimeSettings';
import getGameResult from '../services/gameResult';

interface AppContextType {
    gameData: GameData;
    setGameData: (gameData: GameData) => void;
    config: AppConfig;
    runtimeSettings: RuntimeSettings;
    setRuntimeSettings: React.Dispatch<React.SetStateAction<RuntimeSettings>>;
    currentPosition: ChessInstance;
}

export function useAppContext() {
    return useContext(AppContext);
}

export const AppContext = createContext<AppContextType>({
    gameData: newGameData,
    setGameData: () => null,
    config: {
        engine: {
            status: false,
            isPondering: false,
            analysisLineCount: 3,
        },
    },
    currentPosition: new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'),
    runtimeSettings: defaultRuntimeSettings,
    setRuntimeSettings: () => null,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [gameData, setGameDataState] = useState<GameData>(newGameData);
    const [config, setConfig] = useState<AppConfig>({
        engine: {
            status: false,
            isPondering: false,
            analysisLineCount: 3,
        },
    });
    const [currentPosition, setCurrentPosition] = useState<ChessInstance>(
        new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    );

    const [runtimeSettings, setRuntimeSettings] = useState({
        analysisEnabled: false,
        boardOrientation: true,
    });

    //On App Load, fetch the stored settings
    useEffect(() => {
        window.api.onConfig((event, data) => {
            setConfig(data);
        });

        const fetchSettings = async () => {
            return await window.api.call('config:get');
        };

        fetchSettings().then(config => {
            setConfig(config);
        });
    }, []);

    function setGameData(gameData: GameData) {
        const chess = new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

        // Reset chess.js to selected turn
        chess.load_pgn(gameDataToPgn(gameData));
        setGameDataState(gameData);
        setCurrentPosition(chess);

        //Store result if game is over
        if (gameData.selectedMove === gameData.moves.length) {
            if (chess.game_over()) {
                gameData.result = getGameResult(chess);
            } else {
                gameData.result = { winner: '*' };
            }
        }

        //Update position on engine if enabled
        if (runtimeSettings.analysisEnabled) {
            if (chess.game_over()) window.api.call('engine:position', chess.fen());
            else window.api.call('engine:position', chess.fen());
        }
    }

    const context: AppContextType = {
        gameData,
        setGameData,
        config,
        runtimeSettings,
        setRuntimeSettings,
        currentPosition,
    };

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
