import React, { useState, useCallback } from 'react';
import BingoCard from './BingoCard';
import ControlPanel from './ControlPanel';

function BingoCardCreator() {
  const [cardSettings, setCardSettings] = useState({
    cardName: '',
    cardTitle: '',
    size: 5,
    items: '',
    freeSpace: false,
  });

  const updateSettings = useCallback((newSettings) => {
    setCardSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  }, []);

  return (
    <div className="bingo-card-creator">
      <div className="bingo-card-container">
        <BingoCard settings={cardSettings} />
      </div>
      <div className="control-panel-container">
        <ControlPanel 
          settings={cardSettings} 
          updateSettings={updateSettings} 
        />
      </div>
    </div>
  );
}

export default BingoCardCreator;