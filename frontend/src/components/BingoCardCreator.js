import React, { useState, useCallback } from 'react';
import BingoCard from './BingoCard';
import ControlPanel from './ControlPanel';

function BingoCardCreator() {
  const [cardSettings, setCardSettings] = useState({
    cardName: '',
    cardTitle: '',
    titleFontFamily: 'Arial',
    titleFontSize: '16',
    titleColor: '#000000',
    titleFontStyles: {
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false
    },
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