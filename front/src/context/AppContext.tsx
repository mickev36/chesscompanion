import { createContext, ReactNode, useContext, useState } from 'react';
import { GameData } from '../../../common/types/types';
import { newGameData } from '../assets/newGameData';

interface AppContextType {
    gameData: GameData;
    setGameData: React.Dispatch<React.SetStateAction<GameData>>;
}

export function useAppContext() {
    return useContext(AppContext);
}

export const AppContext = createContext<AppContextType>({
    gameData: newGameData,
    setGameData: () => null,
});

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [gameData, setGameData] = useState<GameData>(newGameData);

    const context: AppContextType = {
        gameData,
        setGameData,
    };

    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
