import React, { useState } from 'react';
import './MainView.css';
import GameTab from '../GameTab/GameTab';
import { GameData } from '../../../../common/types/types';
import { newGameData } from '../../assets/newGameData';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatabaseTab from '../DatabaseTab/DatabaseTab';

function MainView() {
    const [loadedGameData, setLoadedGameData] = useState<GameData>(newGameData);
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    function setLoadedGameDataMock(data: GameData) {
        console.log(data);
        setLoadedGameData(data);
    }

    return (
        <Tabs selectedIndex={selectedTabIndex} onSelect={setSelectedTabIndex}>
            <TabList>
                <Tab>Game</Tab>
                <Tab>Database</Tab>
            </TabList>

            <TabPanel>
                <GameTab loadedGameData={loadedGameData} setLoadedGameData={setLoadedGameDataMock} />
            </TabPanel>
            <TabPanel>
                <DatabaseTab
                    loadedGameData={loadedGameData}
                    setLoadedGameData={setLoadedGameDataMock}
                    setSelectedTabIndex={setSelectedTabIndex}
                />
            </TabPanel>
        </Tabs>
    );
}

export default MainView;
