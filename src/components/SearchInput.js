/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../assets/img/Search.svg';
import { ReactComponent as CancelIcon } from '../assets/img/Cancel.svg';
import { useDebounce } from '../utils/CustomHooks';

const SearchInput = ({ handleChange }) => {
  const [searchText, setSearchText] = useState();

  const _searchText = useDebounce(searchText, 500);

  useEffect(() => {
    handleChange(_searchText);
  }, [_searchText]);

  return (
    <StyledInput className={'inputWithIcon'}>
      <Input
        value={!searchText ? '' : searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="left-icon">
        <SearchIcon />
      </div>
      <button
        className="right-icon"
        onClick={() => {
          setSearchText(null);
        }}>
        <HoverDiv>
          <CancelIcon />
        </HoverDiv>
      </button>
    </StyledInput>
  );
};

export default SearchInput;

const Input = styled.input`
  width: 87%;
  height: 40px;
  padding-left: 48px;
  padding-right: 48px;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  background: #f0f0f6;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  &::-webkit-search-decoration:hover,
  &::-webkit-search-cancel-button:hover {
    cursor: pointer;
  }
`;

const StyledInput = styled.div`
  &.inputWithIcon {
    position: relative;
  }

  .left-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-40%);
    svg {
      fill: black;
      transition: 0.3s;
    }
  }

  button.right-icon {
    background: none;
    border: none;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-40%);
    svg {
      fill: black;
      transition: 0.3s;
    }
  }
`;

const HoverDiv = styled.div`
  padding: 4px;
  border-radius: 24px;
  &:hover {
    cursor: pointer;
    background: #e0e0e0;
  }
`;
