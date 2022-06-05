import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ReactComponent as NextIcon } from '../assets/img/Next.svg';

const Button = (props) => {
  const { Icon, name, name1, device } = props;
  const navigate = useNavigate();
  const { colors } = useTheme();

  return (
    <StyledDiv onClick={() => navigate(`/list/${name}`)} device={device}>
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <div>
          <Icon style={{ width: 30, height: 30 }} />
        </div>
        <div
          style={{
            textTransform: 'uppercase',
            fontFamily: 'Montserrat',
            fontWeight: 700,
            fontSize: 24,
            color: colors.darkGrey,
            marginLeft: 20,
          }}>
          {name1}
        </div>
      </div>
      <div>
        <NextIcon style={{ width: 24, height: 24 }} />
      </div>
    </StyledDiv>
  );
};

export default Button;

const StyledDiv = styled.div`
  width: ${(props) =>
    ['mobile', 'landscape'].includes(props.device) ? '100%' : '42%'};
  height: 50;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  padding-top: 16px;
  border-radius: 4px;
  box-shadow: 0 2px 5px 0 rgba(211, 209, 238, 0.5);
  margin-bottom: ${(props) =>
    ['mobile', 'landscape'].includes(props.device) ? '24px' : '40px'};
  background: white;
  &:hover {
    cursor: pointer;
    box-shadow: 0 2px 5px 0 rgba(94, 86, 231, 0.5);
  }
`;
