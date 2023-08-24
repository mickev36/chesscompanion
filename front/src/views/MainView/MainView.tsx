import React, { useState } from 'react';
import './MainView.css';
import GameTab from '../GameTab/GameTab';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DatabaseTab from '../DatabaseTab/DatabaseTab';
import SettingsTab from '../SettingsTab/SettingsTab';

function MainView() {
    const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

    return (
        <Tabs selectedIndex={selectedTabIndex} onSelect={setSelectedTabIndex}>
            <TabList>
                <Tab>Game</Tab>
                <Tab>Database</Tab>
                <Tab>Settings</Tab>
            </TabList>

            <TabPanel>
                <GameTab />
            </TabPanel>
            <TabPanel>
                <DatabaseTab setSelectedTabIndex={setSelectedTabIndex} />
            </TabPanel>
            <TabPanel>
                <SettingsTab />
            </TabPanel>
        </Tabs>
    );
}

export default MainView;
