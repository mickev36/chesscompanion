import React from 'react';
import './App.css';
import './assets/colors.css';
import './assets/pieces.css';

import MainView from './components/MainView/MainView';

window.api.onEngineMessage((event, data) => {
    console.log('Received Engine message');
    console.log(data);
});

function App() {
    return <MainView />;
}

export default App;
