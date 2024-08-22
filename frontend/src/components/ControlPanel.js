import React, { useState } from 'react';
import { generatePDF } from '../utils/pdfGenerator';

function ControlPanel({ settings, updateSettings }) {
  const [activeTab, setActiveTab] = useState('Text');
  const tabs = ['Text', 'Title', 'Cell', 'Card', 'Color', 'Image', 'Misc'];

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

  const handlePrint = () => {
    generatePDF(settings);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Text':
        return (
          <div>
            <label>
              Card Name:
              <input
                type="text"
                value={settings.cardName}
                onChange={(e) => updateSettings({ cardName: e.target.value })}
              />
            </label>
            <label>
              Card Title:
              <input
                type="text"
                value={settings.cardTitle}
                onChange={(e) => updateSettings({ cardTitle: e.target.value })}
              />
            </label>
            <label>
              Card Size:
              <input
                type="number"
                value={settings.size}
                onChange={(e) => updateSettings({ size: Number(e.target.value) })}
                min="3"
                max="7"
              />
            </label>
            <div className="items-container">
              <label>
                Items (comma-separated):
                <textarea
                  value={settings.items}
                  onChange={(e) => updateSettings({ items: e.target.value })}
                />
              </label>
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
      // Add cases for other tabs
      default:
        return <div>Content for {activeTab} tab</div>;
    }
  };

  return (
    <div className="control-panel">
      <div className="tab-buttons">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'active' : ''}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {renderTabContent()}
      </div>
      <div className="print-button-container">
        <button onClick={handlePrint} className="print-button">
          Print Bingo Card
        </button>
      </div>
    </div>
  );
}

export default ControlPanel;