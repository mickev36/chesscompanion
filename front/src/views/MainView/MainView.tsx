import React, { useState } from 'react';
import './MainView.css';
import GameTab from '../GameTab/GameTab';
import { GameData } from '../../../../common/types/types';
import { newGameData } from '../../assets/newGameData';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatabaseTab from '../DatabaseTab/DatabaseTab';
import SettingsTab from '../SettingsTab/SettingsTab';

function MainView() {
    const [loadedGameData, setLoadedGameData] = useState<GameData>(newGameData);
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    return (
        <Tabs selectedIndex={selectedTabIndex} onSelect={setSelectedTabIndex}>
            <TabList>
                <Tab>Game</Tab>
                <Tab>Database</Tab>
                <Tab>Settings</Tab>
            </TabList>

            <TabPanel>
                <GameTab loadedGameData={loadedGameData} setLoadedGameData={setLoadedGameData} />
            </TabPanel>
            <TabPanel>
                <DatabaseTab
                    loadedGameData={loadedGameData}
                    setLoadedGameData={setLoadedGameData}
                    setSelectedTabIndex={setSelectedTabIndex}
                />
            </TabPanel>
            <TabPanel>
                <SettingsTab />
            </TabPanel>
        </Tabs>
    );
}

export default MainView;
