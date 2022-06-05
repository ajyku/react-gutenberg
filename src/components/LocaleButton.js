import React from 'react';
import styled from 'styled-components';

const LocaleButton = (props) => {
  const { name, handleClick, selected } = props;
  return (
    <StyledButton onClick={() => handleClick(name)} selected={selected}>
      {name}
    </StyledButton>
  );
};

export default LocaleButton;

const StyledButton = styled.button`
  border-radius: 2px;
  padding: 4px 8px;
  border: 1px solid #5e56e7;
  box-shadow: 0 1px 5px 0 #5e56e7;
  background: ${(props) => (props.selected ? '#5E56E7' : 'white')};
  color: ${(props) => (props.selected ? 'white' : '#5E56E7')};
  text-transform: uppercase;

  &:hover {
    cursor: pointer;
    box-shadow: 0 1px 5px 0 #b0acf3;
  }
`;

// margin-bottom: ${(props) => ['mobile', 'landscape'].includes(props.device) ? '24px' : '40px'};
