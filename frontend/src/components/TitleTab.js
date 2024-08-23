import React from 'react';
import './TitleTab.css';

function TitleTab({ settings, updateSettings }) {
  const fontFamilies = [
    'Arial', 'Helvetica', 'Times New Roman', 'Courier', 'Verdana', 
    'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 
    'Trebuchet MS', 'Arial Black', 'Impact'
  ];

  const fontSizes = Array.from({ length: 66 }, (_, i) => i + 10); // 10px to 75px

  const handleFontStyleChange = (style) => {
    updateSettings({ 
      titleFontStyles: {
        ...settings.titleFontStyles,
        [style]: !settings.titleFontStyles[style]
      }
    });
  };

  return (
    <div className="title-tab">
      <div className="input-group full-width">
        <label htmlFor="cardTitle">Card Title:</label>
        <input
          id="cardTitle"
          type="text"
          value={settings.cardTitle}
          onChange={(e) => updateSettings({ cardTitle: e.target.value })}
          className="full-width-input"
        />
      </div>
      <div className="input-group">
        <label htmlFor="titleFontFamily">Font Family:</label>
        <select
          id="titleFontFamily"
          value={settings.titleFontFamily || 'Arial'}
          onChange={(e) => updateSettings({ titleFontFamily: e.target.value })}
        >
          {fontFamilies.map(font => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="titleFontSize">Font Size (px):</label>
        <select
          id="titleFontSize"
          value={settings.titleFontSize || '16'}
          onChange={(e) => updateSettings({ titleFontSize: e.target.value })}
        >
          {fontSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      <div className="font-style-checkboxes">
        <label>
          <input
            type="checkbox"
            checked={settings.titleFontStyles?.bold || false}
            onChange={() => handleFontStyleChange('bold')}
          />
          Bold
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.titleFontStyles?.italic || false}
            onChange={() => handleFontStyleChange('italic')}
          />
          Italic
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.titleFontStyles?.underline || false}
            onChange={() => handleFontStyleChange('underline')}
          />
          Underline
        </label>
        <label>
          <input
            type="checkbox"
            checked={settings.titleFontStyles?.strikethrough || false}
            onChange={() => handleFontStyleChange('strikethrough')}
          />
          Strikethrough
        </label>
      </div>
    </div>
  );
}

export default TitleTab;