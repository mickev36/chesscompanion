import React from 'react';
import './App.css';
import './assets/colors.css';
import './assets/pieces.css';
import { AppContextProvider } from './context/AppContext';

import MainView from './views/MainView/MainView';

function App() {
    return (
        <AppContextProvider>
            <MainView />
        </AppContextProvider>
    );
}

export default App;
