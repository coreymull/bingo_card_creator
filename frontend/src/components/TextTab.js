import React from 'react';
import './TextTab.css';

function TextTab({ settings, updateSettings }) {
  const sortItems = () => {
    const sortedItems = settings.items
      .split(',')
      .map(item => item.trim())
      .sort((a, b) => a.localeCompare(b))
      .join(', ');
    updateSettings({ items: sortedItems });
  };

  const deduplicateItems = () => {
    const uniqueItems = [...new Set(settings.items.split(',').map(item => item.trim()))].join(', ');
    updateSettings({ items: uniqueItems });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateSettings({ [name]: value });
  };

  return (
    <div className="text-tab">
      <div className="input-group full-width">
        <label>
          Card Name:
          <input
            type="text"
            name="cardName"
            value={settings.cardName || ''}
            onChange={handleInputChange}
          />
        </label>
      </div>
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
        <label htmlFor="cardSize">Card Size:</label>
        <input
          id="cardSize"
          type="number"
          value={settings.size}
          onChange={(e) => updateSettings({ size: Number(e.target.value) })}
          min="3"
          max="7"
        />
      </div>
      <div className="items-container">
        <label htmlFor="items">Items (comma-separated):</label>
        <textarea
          id="items"
          value={settings.items}
          onChange={(e) => updateSettings({ items: e.target.value })}
          className="full-width-input"
        />
        <div className="items-actions">
          <button onClick={sortItems}>Sort</button>
          <button onClick={deduplicateItems}>Deduplicate</button>
        </div>
      </div>
      <div className="free-space-container">
        <input
          type="checkbox"
          id="freeSpace"
          checked={settings.freeSpace}
          onChange={(e) => updateSettings({ freeSpace: e.target.checked })}
          className="free-space-checkbox"
        />
        <label htmlFor="freeSpace" className="free-space-label">
          Free Space
        </label>
      </div>
    </div>
  );
}

export default TextTab;