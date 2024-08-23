import React from 'react';
import './CellTab.css';

function CellTab({ settings, updateSettings }) {
  const handleBorderChange = (property, value) => {
    updateSettings({
      cellBorder: {
        ...settings.cellBorder,
        [property]: value
      }
    });
  };

  const handleBackgroundChange = (property, value) => {
    updateSettings({
      cellBackground: {
        ...settings.cellBackground,
        [property]: value
      }
    });
  };

  const handleTextChange = (property, value) => {
    updateSettings({
      cellText: {
        ...settings.cellText,
        [property]: value
      }
    });
  };

  const handleTextStyleChange = (style) => {
    updateSettings({
      cellText: {
        ...settings.cellText,
        styles: {
          ...settings.cellText?.styles,
          [style]: !settings.cellText?.styles?.[style]
        }
      }
    });
  };

  const handleItemsChange = (value) => {
    updateSettings({ items: value });
  };

  const patterns = [
    'none',
    'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="20" height="20" fill="none" stroke="black" stroke-width="2"/%3E%3C/svg%3E")',
    'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Ccircle cx="10" cy="10" r="5" fill="black"/%3E%3C/svg%3E")',
    // Add more patterns as needed
  ];

  return (
    <div className="cell-tab">
      <h3>Bingo Items</h3>
      <div className="input-group full-width">
        <label htmlFor="items">Items (comma-separated):</label>
        <textarea
          id="items"
          value={settings.items}
          onChange={(e) => handleItemsChange(e.target.value)}
          placeholder="Enter bingo items, separated by commas"
          rows="5"
        />
      </div>

      <h3>Cell Border</h3>
      <div className="input-group">
        <label htmlFor="borderThickness">Border Thickness (px):</label>
        <input
          type="number"
          id="borderThickness"
          value={settings.cellBorder?.thickness || 1}
          onChange={(e) => handleBorderChange('thickness', e.target.value)}
          min="0"
          max="10"
        />
      </div>
      <div className="input-group">
        <label htmlFor="borderStyle">Border Style:</label>
        <select
          id="borderStyle"
          value={settings.cellBorder?.style || 'solid'}
          onChange={(e) => handleBorderChange('style', e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="dashed">Dashed</option>
          <option value="dotted">Dotted</option>
          <option value="double">Double</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="borderColor">Border Color:</label>
        <input
          type="color"
          id="borderColor"
          value={settings.cellBorder?.color || '#000000'}
          onChange={(e) => handleBorderChange('color', e.target.value)}
        />
      </div>

      <h3>Cell Background</h3>
      <div className="input-group">
        <label htmlFor="backgroundColor">Background Color:</label>
        <input
          type="color"
          id="backgroundColor"
          value={settings.cellBackground?.color || '#ffffff'}
          onChange={(e) => handleBackgroundChange('color', e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="backgroundType">Background Type:</label>
        <select
          id="backgroundType"
          value={settings.cellBackground?.type || 'solid'}
          onChange={(e) => handleBackgroundChange('type', e.target.value)}
        >
          <option value="solid">Solid</option>
          <option value="gradient">Gradient</option>
          <option value="pattern">Pattern</option>
        </select>
      </div>
      {settings.cellBackground?.type === 'gradient' && (
        <>
          <div className="input-group">
            <label htmlFor="gradientColor1">Gradient Color 1:</label>
            <input
              type="color"
              id="gradientColor1"
              value={settings.cellBackground?.gradientColor1 || '#ffffff'}
              onChange={(e) => handleBackgroundChange('gradientColor1', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="gradientColor2">Gradient Color 2:</label>
            <input
              type="color"
              id="gradientColor2"
              value={settings.cellBackground?.gradientColor2 || '#000000'}
              onChange={(e) => handleBackgroundChange('gradientColor2', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="gradientDirection">Gradient Direction:</label>
            <select
              id="gradientDirection"
              value={settings.cellBackground?.gradientDirection || 'to right'}
              onChange={(e) => handleBackgroundChange('gradientDirection', e.target.value)}
            >
              <option value="to right">Horizontal</option>
              <option value="to bottom">Vertical</option>
              <option value="to bottom right">Diagonal</option>
            </select>
          </div>
        </>
      )}
      {settings.cellBackground?.type === 'pattern' && (
        <div className="input-group">
          <label htmlFor="pattern">Pattern:</label>
          <select
            id="pattern"
            value={settings.cellBackground?.pattern || 'none'}
            onChange={(e) => handleBackgroundChange('pattern', e.target.value)}
          >
            {patterns.map((pattern, index) => (
              <option key={index} value={pattern}>Pattern {index + 1}</option>
            ))}
          </select>
        </div>
      )}

      <h3>Cell Text</h3>
      <div className="input-group">
        <label htmlFor="fontFamily">Font Family:</label>
        <select
          id="fontFamily"
          value={settings.cellText?.fontFamily || 'Arial'}
          onChange={(e) => handleTextChange('fontFamily', e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier">Courier</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="fontSize">Font Size (px):</label>
        <input
          type="number"
          id="fontSize"
          value={settings.cellText?.fontSize || 16}
          onChange={(e) => handleTextChange('fontSize', e.target.value)}
          min="8"
          max="72"
        />
      </div>
      <div className="input-group">
        <label htmlFor="textColor">Text Color:</label>
        <input
          type="color"
          id="textColor"
          value={settings.cellText?.color || '#000000'}
          onChange={(e) => handleTextChange('color', e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="textAlign">Text Alignment:</label>
        <select
          id="textAlign"
          value={settings.cellText?.align || 'center'}
          onChange={(e) => handleTextChange('align', e.target.value)}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div className="input-group">
        <label>Text Style:</label>
        <div className="text-style-buttons">
          <button
            className={settings.cellText?.styles?.bold ? 'active' : ''}
            onClick={() => handleTextStyleChange('bold')}
          >
            B
          </button>
          <button
            className={settings.cellText?.styles?.italic ? 'active' : ''}
            onClick={() => handleTextStyleChange('italic')}
          >
            I
          </button>
          <button
            className={settings.cellText?.styles?.underline ? 'active' : ''}
            onClick={() => handleTextStyleChange('underline')}
          >
            U
          </button>
        </div>
      </div>
    </div>
  );
}

export default CellTab;