import React from 'react';
import './App.css';
import BingoCardCreator from './components/BingoCardCreator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bingo Card Creator</h1>
      </header>
      <main>
        <BingoCardCreator />
      </main>
    </div>
  );
}

export default App;