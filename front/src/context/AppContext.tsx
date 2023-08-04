import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GameData, Settings } from '../../../common/types/types';
import { newGameData } from '../assets/newGameData';

interface AppContextType {
    gameData: GameData;
    setGameData: React.Dispatch<React.SetStateAction<GameData>>;
    settings: Settings;
}

export function useAppContext() {
    return useContext(AppContext);
}

export const AppContext = createContext<AppContextType>({
    gameData: newGameData,
    setGameData: () => null,
    settings: {},
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [gameData, setGameData] = useState<GameData>(newGameData);
    const [settings, setSettings] = useState<Settings>({});

    //On App Load, fetch the stored settings
    useEffect(() => {
        window.api.onSettings((event, data) => {
            setSettings(data);
        });

        const fetchSettings = async () => {
            return await window.api.call('settings:get');
        };

        fetchSettings().then(storedSettings => {
            setSettings(storedSettings);
        });
    }, []);

    const context: AppContextType = {
        gameData,
        setGameData,
        settings,
    };

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
