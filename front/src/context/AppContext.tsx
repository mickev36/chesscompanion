import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppConfig, GameData, Settings } from '../../../common/types/types';
import { newGameData } from '../assets/newGameData';

interface AppContextType {
    gameData: GameData;
    setGameData: React.Dispatch<React.SetStateAction<GameData>>;
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
        engineStatus: false,
    },
    analysisEnabled: false,
    setAnalysisEnabled: () => null,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [gameData, setGameData] = useState<GameData>(newGameData);
    const [config, setConfig] = useState<AppConfig>({ engineStatus: false });
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

    const context: AppContextType = {
        gameData,
        setGameData,
        config,
        analysisEnabled,
        setAnalysisEnabled,
    };

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
