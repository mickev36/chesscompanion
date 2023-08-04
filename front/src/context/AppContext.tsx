import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppConfig, GameData, Settings } from '../../../common/types/types';
import { newGameData } from '../assets/newGameData';

interface AppContextType {
    gameData: GameData;
    setGameData: React.Dispatch<React.SetStateAction<GameData>>;
    config: AppConfig;
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
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [gameData, setGameData] = useState<GameData>(newGameData);
    const [config, setConfig] = useState<AppConfig>({ engineStatus: false });

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
    };

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
