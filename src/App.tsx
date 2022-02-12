import React from 'react';
import './App.css';
import Body from './Components/Body';
import { Navigation } from './Components/Navigation';
import { AppContextProvider } from './Context/AppContext'

const App = () => {
  return (
    <div className="app_container">
      <AppContextProvider>
        <Navigation/>
        <Body/>
      </AppContextProvider>
    </div>
  );
}

export default App;
