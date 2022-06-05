/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { withAPIRequest } from '../HOC/withAPIRequest';
import Card from '../components/Card';
import SearchInput from '../components/SearchInput';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as BackIcon } from '../assets/img/Back.svg';
import styled from 'styled-components';
import { useGlobalContext } from '../context/GlobalContext';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { BASE_URL } from '../utils/Constants';

const offsetScroll = 1; // higher value gives multiple event triggers so don't do that

function List(props) {
  const { fetchAPI } = props;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchText, setSearchText] = useState(null);
  const [url, setUrl] = useState();

  const { windowSize } = useGlobalContext();
  const { colors } = useTheme();

  const navigate = useNavigate();

  const { id } = useParams();
  const { t } = useTranslation();

  const nextUrlRef = useRef(); // useState is not working correctly with eventListener function, so used useRef
  const appendRef = useRef(false);

  useEffect(() => {
    setFetchUrl();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchText !== undefined) {
      appendRef.current = false;
      setFetchUrl();
    }
  }, [searchText]);

  useEffect(() => fetchData(url), [url]);

  // useEffect(
  //   () => console.log('[nextUrlRef.cuurent]', nextUrlRef.current),
  //   [nextUrlRef.current]
  // );

  // useEffect(
  //   () => console.log('[appendRef.current]', appendRef.current),
  //   [appendRef.current]
  // );

  function handleScroll(e) {
    e.preventDefault();
    if (
      window.innerHeight + e.target.documentElement.scrollTop + offsetScroll >
      e.target.documentElement.scrollHeight
    ) {
      // Reached bottom
      // console.log('Reached bottom: nextUrlRef.current', nextUrlRef.current);
      if (nextUrlRef.current !== undefined && nextUrlRef.current !== null) {
        appendRef.current = true;
        setUrl(nextUrlRef.current);
      }
    }
  }

  const setFetchUrl = () => {
    let _url = `/books/?mime_type=image&topic=${id}&languages=${t(
      'language'
    )}&search=${!searchText ? '' : searchText}`;
    setUrl(_url);
  };

  const fetchData = useCallback(
    (url) => {
      if (!url) return;

      setError();
      fetchAPI(
        {
          url: url,
          method: 'get',
          headers: {
            accept: '*/*',
          },
          setLoading: setLoading,
        },
        (error, response) => {
          if (error) {
            console.log('[Error]', error);
            setError(error.toString());
          } else {
            // console.log('[Response]', response);
            if (!appendRef.current || data === undefined) {
              // console.log('<> REPLACING DATA');
              setData(response.results);
            } else {
              // console.log('<> APPEND DATA');
              setData((oldData) => [...oldData, ...response.results]);
            }
            if (response.next !== null) {
              const _nextUrl = response.next.replace(BASE_URL, '');
              // console.log('Setting next URL.......', _nextUrl);
              nextUrlRef.current = _nextUrl;
            }
          }
        }
      );
    },
    [url]
  );

  function gotoLink(link) {
    navigate(link);
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          // background: 'yellow',
        }}>
        <div
          style={{
            maxWidth: 700,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            marginRight: 48,
            // background: 'red',
            marginBottom: 16,
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 32,
              // marginLeft: 16,
            }}>
            <HoverDiv hoverColor={colors.mediumGrey}>
              <BackIcon onClick={() => navigate('/')} />
            </HoverDiv>
            <div
              style={{
                marginLeft: 8,
                fontSize: 30,
                fontFamily: 'Montserrat',
                fontWeight: 900,
                color: colors.primary,
                textTransform: 'uppercase',
              }}>
              {t(`topics.${id}`)}
            </div>
          </div>
          <div style={{ margin: '16px 0px 8px 0px' }}>
            <SearchInput handleChange={(value) => setSearchText(value)} />
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: colors.light,
        }}>
        <div
          style={{
            maxWidth: 800,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // background: 'green',
          }}>
          <div
            style={{
              // margin: 16,
              padding: 16,

              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              // justifyContent: 'space-around',
            }}>
            {data !== undefined &&
              data.map((item) => (
                <Card key={uuidv4()} item={item} gotoLink={gotoLink} />
              ))}
            {loading && (
              <div
                style={{
                  width: 114,
                  height: 150,
                  padding: 16,
                  margin: 16,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontFamily: 'Montserrat',
                  fontWeight: 700,
                  color: colors.primary,
                }}>
                {t('loading')}...
              </div>
            )}
          </div>
          {!data || data.length === 0 ? (
            <div style={{ margin: 24, color: 'grey' }}>No book</div>
          ) : null}
          {error !== undefined && (
            <div style={{ margin: 64, color: 'red' }}>{error}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default withAPIRequest(List);

const HoverDiv = styled.div`
  padding: 4px;
  padding-top: 8px;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.hoverColor};
  }
`;
