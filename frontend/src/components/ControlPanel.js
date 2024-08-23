import React, { useState } from 'react';
import TextTab from './TextTab';
import TitleTab from './TitleTab';

function ControlPanel({ settings, updateSettings }) {
  const [activeTab, setActiveTab] = useState('Text');
  const tabs = ['Text', 'Title', 'Cell', 'Card', 'Color', 'Image', 'Misc'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Text':
        return <TextTab settings={settings} updateSettings={updateSettings} />;
      case 'Title':
        return <TitleTab settings={settings} updateSettings={updateSettings} />;
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
    </div>
  );
}

export default ControlPanel;