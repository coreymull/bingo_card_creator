import React from 'react';
import './BingoCard.css';

const BingoCard = ({ settings }) => {
  const { size, items, freeSpace, cardTitle, titleFontFamily, titleFontSize, titleColor, titleFontStyles } = settings;
  const itemList = items.split(',').map(item => item.trim()).filter(item => item !== '');
  const card = Array(size).fill().map(() => Array(size).fill(''));

  if (itemList.length > 0) {
    const repeatedItems = [...itemList, ...itemList, ...itemList].slice(0, size * size);
    const shuffled = repeatedItems.sort(() => 0.5 - Math.random());
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        card[i][j] = shuffled[i * size + j];
      }
    }
  }

  if (freeSpace && size % 2 === 1) {
    const center = Math.floor(size / 2);
    card[center][center] = 'FREE';
  }

  const titleStyle = {
    fontFamily: titleFontFamily || 'Arial',
    fontSize: `${titleFontSize || 16}px`,
    fontWeight: titleFontStyles?.bold ? 'bold' : 'normal',
    fontStyle: titleFontStyles?.italic ? 'italic' : 'normal',
    textDecoration: [
      titleFontStyles?.underline ? 'underline' : '',
      titleFontStyles?.strikethrough ? 'line-through' : ''
    ].join(' ').trim(),
    color: titleColor || '#000000'
  };

  const renderCardTitle = () => {
    if (cardTitle.toUpperCase() === cardTitle && cardTitle.length === size) {
      return (
        <tr className="card-title">
          {cardTitle.split('').map((letter, index) => (
            <th key={index}>
              <div className="cell-content" style={titleStyle}>{letter}</div>
            </th>
          ))}
        </tr>
      );
    } else {
      return (
        <tr className="card-title">
          <th colSpan={size}>
            <div className="cell-content" style={titleStyle}>{cardTitle}</div>
          </th>
        </tr>
      );
    }
  };

  return (
    <div className="bingo-card">
      <table className={`grid-${size}`}>
        <thead>
          {renderCardTitle()}
        </thead>
        <tbody>
          {card.map((row, i) => (
            <tr key={i}>
              {row.map((item, j) => (
                <td key={j}>
                  <div className="cell-content">{item}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BingoCard;