import React from 'react';
import './CardTab.css';

function CardTab({ settings, updateSettings }) {
  const handleFooterToggle = (e) => {
    updateSettings({ showFooter: e.target.checked });
  };

  const handleFooterTextChange = (e) => {
    updateSettings({ footerText: e.target.value });
  };

  const handleFooterFontFamilyChange = (e) => {
    updateSettings({ footerFontFamily: e.target.value });
  };

  const handleFooterFontSizeChange = (e) => {
    updateSettings({ footerFontSize: e.target.value });
  };

  const handleFooterColorChange = (e) => {
    updateSettings({ footerColor: e.target.value });
  };

  const handleFooterStyleChange = (style) => {
    updateSettings({
      footerFontStyles: {
        ...settings.footerFontStyles,
        [style]: !settings.footerFontStyles[style],
      },
    });
  };

  const handleFooterAlignChange = (e) => {
    updateSettings({ footerAlign: e.target.value, footerPositionX: 0, footerPositionY: 0 });
  };

  const handleNudge = (direction) => {
    const nudgeAmount = 5; // Adjust this value as needed
    let { footerPositionX, footerPositionY } = settings;

    switch (direction) {
      case 'up':
        footerPositionY = Math.max(footerPositionY - nudgeAmount, -50);
        break;
      case 'down':
        footerPositionY = Math.min(footerPositionY + nudgeAmount, 50);
        break;
      case 'left':
        footerPositionX = Math.max(footerPositionX - nudgeAmount, -50);
        break;
      case 'right':
        footerPositionX = Math.min(footerPositionX + nudgeAmount, 50);
        break;
      default:
        break;
    }

    updateSettings({ footerPositionX, footerPositionY });
  };

  return (
    <div className="card-tab">
      <div className="footer-control">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={settings.showFooter || false}
            onChange={handleFooterToggle}
          />
          <span className="toggle-switch"></span>
          Show Footer
        </label>
      </div>
      {settings.showFooter && (
        <div className="footer-options">
          <div className="footer-text-input">
            <label htmlFor="footerText">Footer Text:</label>
            <input
              type="text"
              id="footerText"
              value={settings.footerText || ''}
              onChange={handleFooterTextChange}
              placeholder="Enter footer text"
            />
          </div>
          <div className="footer-font-family">
            <label htmlFor="footerFontFamily">Font Family:</label>
            <select
              id="footerFontFamily"
              value={settings.footerFontFamily || 'Arial'}
              onChange={handleFooterFontFamilyChange}
            >
              <option value="Arial">Arial</option>
              <option value="Verdana">Verdana</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          <div className="footer-font-size">
            <label htmlFor="footerFontSize">Font Size:</label>
            <input
              type="number"
              id="footerFontSize"
              value={settings.footerFontSize || 16}
              onChange={handleFooterFontSizeChange}
              min="8"
              max="72"
            />
          </div>
          <div className="footer-color">
            <label htmlFor="footerColor">Color:</label>
            <input
              type="color"
              id="footerColor"
              value={settings.footerColor || '#000000'}
              onChange={handleFooterColorChange}
            />
          </div>
          <div className="footer-styles">
            <label>Styles:</label>
            <div className="style-options">
              <label>
                <input
                  type="checkbox"
                  checked={settings.footerFontStyles?.bold || false}
                  onChange={() => handleFooterStyleChange('bold')}
                />
                Bold
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.footerFontStyles?.italic || false}
                  onChange={() => handleFooterStyleChange('italic')}
                />
                Italic
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={settings.footerFontStyles?.underline || false}
                  onChange={() => handleFooterStyleChange('underline')}
                />
                Underline
              </label>
            </div>
          </div>
          <div className="footer-align">
            <label htmlFor="footerAlign">Alignment:</label>
            <select
              id="footerAlign"
              value={settings.footerAlign || 'center'}
              onChange={handleFooterAlignChange}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div className="footer-nudge">
            <label>Nudge:</label>
            <div className="nudge-buttons">
              <button onClick={() => handleNudge('up')}>Up</button>
              <button onClick={() => handleNudge('down')}>Down</button>
              <button onClick={() => handleNudge('left')}>Left</button>
              <button onClick={() => handleNudge('right')}>Right</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardTab;