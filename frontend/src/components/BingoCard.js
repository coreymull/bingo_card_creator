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

  const getCellBackgroundStyle = () => {
    const bg = settings.cellBackground;
    if (!bg) return {};

    switch (bg.type) {
      case 'gradient':
        return {
          background: `linear-gradient(${bg.gradientDirection}, ${bg.gradientColor1}, ${bg.gradientColor2})`
        };
      case 'pattern':
        return {
          backgroundColor: bg.color,
          backgroundImage: bg.pattern
        };
      default:
        return { backgroundColor: bg.color };
    }
  };

  const getCellTextStyle = () => {
    const text = settings.cellText;
    if (!text) return {};

    return {
      fontFamily: text.fontFamily || 'Arial',
      fontSize: `${text.fontSize || 16}px`,
      color: text.color || '#000000',
      textAlign: text.align || 'center',
      fontWeight: text.styles?.bold ? 'bold' : 'normal',
      fontStyle: text.styles?.italic ? 'italic' : 'normal',
      textDecoration: text.styles?.underline ? 'underline' : 'none',
    };
  };

  const cellStyle = {
    ...getCellBackgroundStyle(),
    borderWidth: `${settings.cellBorder?.thickness || 1}px`,
    borderStyle: settings.cellBorder?.style || 'solid',
    borderColor: settings.cellBorder?.color || '#000000'
  };

  const cellContentStyle = getCellTextStyle();

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

  const renderFooter = () => {
    if (settings.showFooter && settings.footerText) {
      const footerStyle = {
        fontFamily: settings.footerFontFamily || 'Arial',
        fontSize: `${settings.footerFontSize || 16}px`,
        color: settings.footerColor || '#000000',
        fontWeight: settings.footerFontStyles?.bold ? 'bold' : 'normal',
        fontStyle: settings.footerFontStyles?.italic ? 'italic' : 'normal',
        textDecoration: settings.footerFontStyles?.underline ? 'underline' : 'none',
      };

      return (
        <tfoot>
          <tr>
            <td colSpan={size}>
              <div className="footer-content" style={footerStyle}>{settings.footerText}</div>
            </td>
          </tr>
        </tfoot>
      );
    }
    return null;
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
                <td key={j} style={cellStyle}>
                  <div className="cell-content" style={cellContentStyle}>{item}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {renderFooter()}
      </table>
    </div>
  );
};

export default BingoCard;