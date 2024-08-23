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
    cellBorder: {
      thickness: 1,
      style: 'solid',
      color: '#000000'
    },
    cellBackground: {
      type: 'solid',
      color: '#ffffff',
      gradientColor1: '#ffffff',
      gradientColor2: '#000000',
      gradientDirection: 'to right',
      pattern: 'none'
    },
    cellText: {
      fontFamily: 'Arial',
      fontSize: 16,
      color: '#000000',
      align: 'center',
      styles: {
        bold: false,
        italic: false,
        underline: false
      }
    }
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