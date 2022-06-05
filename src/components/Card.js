/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  width: 114px;
  padding: 16px;
  // margin: 8px;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    background: white;
    box-shadow: 0 2px 5px 0 rgba(211, 209, 238, 0.5);
  }
`;

function Card({ item, gotoLink }) {
  function getAuthors() {
    // let authors = [];
    // item.authors.map((author) => authors.push(author.name));
    // return authors.join(' | ');
    const author = item.authors[0] !== undefined ? item.authors[0].name : '';
    return author.replace(',', '');
  }

  function openBook() {
    const html = item.formats['text/html; charset=utf-8'];
    const pdf = item.formats['application/pdf'];
    const text = item.formats['text/plain; charset=utf-8'];
    if (html && !isZip(html)) {
      window.open(html);
    } else if (pdf && !isZip(pdf)) {
      window.open(pdf);
    } else if (text && !isZip(text)) {
      window.open(text);
    } else {
      alert('No viewable version available');
    }
  }

  function isZip(str) {
    const ext = str.slice(-4);
    if (ext === '.zip') {
      return true;
    } else {
      return false;
    }
  }

  return (
    <StyledCard onClick={() => openBook()}>
      <img
        style={{
          width: 114,
          height: 162,
          borderRadius: 8,
          boxShadow: '0 2px 5px 0 rgba(211, 209, 238, 0.5)',
        }}
        src={item.formats['image/jpeg']}
      />
      <div
        style={{
          fontFamily: 'Montserrat',
          fontSize: 14,
          fontWeight: 700,
          marginTop: 8,
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
        {item.title}
      </div>
      <div
        style={{
          fontFamily: 'Montserrat',
          fontSize: 10,
          fontWeight: 700,
          color: '#808080',
          marginTop: 4,
        }}>
        {getAuthors()}
      </div>
    </StyledCard>
  );
}

export default Card;
