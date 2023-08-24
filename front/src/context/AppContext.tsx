import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppConfig, GameData } from '../../../common/types/types';
import { newGameData } from '../assets/newGameData';
import { Chess, ChessInstance } from 'chess.js';
import { gameDataToPgn } from '../services/gameDataPgnConversion';

interface AppContextType {
    gameData: GameData;
    setGameData: (gameData: GameData) => void;
    config: AppConfig;
    analysisEnabled: boolean;
    setAnalysisEnabled: React.Dispatch<React.SetStateAction<boolean>>;
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
        },
    },
    analysisEnabled: false,
    setAnalysisEnabled: () => null,
    currentPosition: new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'),
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [gameData, setGameDataState] = useState<GameData>(newGameData);
    const [config, setConfig] = useState<AppConfig>({
        engine: {
            status: false,
            isPondering: false,
        },
    });
    const [currentPosition, setCurrentPosition] = useState<ChessInstance>(
        new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    );
    const [analysisEnabled, setAnalysisEnabled] = useState<boolean>(false);

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

        if (analysisEnabled) {
            if (chess.game_over()) window.api.call('engine:position', chess.fen());
            else window.api.call('engine:position', chess.fen());
        }
    }

    const context: AppContextType = {
        gameData,
        setGameData,
        config,
        analysisEnabled,
        setAnalysisEnabled,
        currentPosition,
    };

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
