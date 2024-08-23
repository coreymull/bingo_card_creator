import React, { useState } from 'react';
import BingoCard from './BingoCard';
import ControlPanel from './ControlPanel';

const BingoCardCreator = () => {
  const [settings, setSettings] = useState({
    size: 5,
    items: '',
    freeSpace: true,
    cardTitle: 'BINGO',
    cardName: '', // Add cardName to settings
    titleFontFamily: 'Arial',
    titleFontSize: 16,
    titleColor: '#000000',
    titleFontStyles: {},
    cellBackground: {},
    cellText: {},
    cellBorder: {},
    showFooter: false,
    footerText: '',
    footerFontFamily: 'Arial',
    footerFontSize: 16,
    footerColor: '#000000',
    footerFontStyles: {},
    footerAlign: 'center',
    footerPositionX: 0,
    footerPositionY: 0
  });

  const [savedCards, setSavedCards] = useState({});
  const [selectedCard, setSelectedCard] = useState('');

  const updateSettings = (newSettings) => {
    setSettings({ ...settings, ...newSettings });
  };

  const saveCard = () => {
    const cardName = settings.cardName || settings.cardTitle;
    setSavedCards({ ...savedCards, [cardName]: settings });
  };

  const loadCard = (cardName) => {
    setSettings(savedCards[cardName]);
    setSelectedCard(cardName);
  };

  return (
    <div className="bingo-card-creator">
      <div className="bingo-card-container">
        <BingoCard settings={settings} />
        <div className="save-load-controls">
          <button onClick={saveCard}>Save Card</button>
          <select onChange={(e) => loadCard(e.target.value)} value={selectedCard}>
            <option value="" disabled>Select a saved card</option>
            {Object.keys(savedCards).map((cardName) => (
              <option key={cardName} value={cardName}>{cardName}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="control-panel-container">
        <ControlPanel settings={settings} updateSettings={updateSettings} />
      </div>
    </div>
  );
};

export default BingoCardCreator;