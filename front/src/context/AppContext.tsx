import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppConfig, GameData, GameDataState } from '../../../common/types/types';
import { newGameData } from '../assets/newGameData';
import { Chess } from 'chess.js';
import { gameDataToPgn } from '../services/gameDataPgnConversion';

interface AppContextType {
    gameData: GameDataState;
    setGameData: (gameData: GameData) => void;
    config: AppConfig;
    analysisEnabled: boolean;
    setAnalysisEnabled: React.Dispatch<React.SetStateAction<boolean>>;
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
        },
    },
    analysisEnabled: false,
    setAnalysisEnabled: () => null,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [gameData, setGameDataState] = useState<GameDataState>(newGameData);
    const [config, setConfig] = useState<AppConfig>({
        engine: {
            status: false,
        },
    });
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
        setGameDataState({ ...gameData, currentPosition: chess });
        if (analysisEnabled) window.api.call('engine:position', chess.fen());
    }

    const context: AppContextType = {
        gameData,
        setGameData,
        config,
        analysisEnabled,
        setAnalysisEnabled,
    };

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
