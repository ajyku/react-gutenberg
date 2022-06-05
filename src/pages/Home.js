import React from 'react';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { useTheme } from '../context/ThemeContext';
import Pattern from '../assets/img/Pattern.svg';
import { v4 as uuidv4 } from 'uuid';

import CategoryButton from '../components/CategoryButton';
import { ReactComponent as FictionIcon } from '../assets/img/Fiction.svg';
import { ReactComponent as DramaIcon } from '../assets/img/Drama.svg';
import { ReactComponent as HumourIcon } from '../assets/img/Humour.svg';
import { ReactComponent as PoliticsIcon } from '../assets/img/Politics.svg';
import { ReactComponent as PhilosophyIcon } from '../assets/img/Philosophy.svg';
import { ReactComponent as HostoryIcon } from '../assets/img/History.svg';
import { ReactComponent as AdventureIcon } from '../assets/img/Adventure.svg';

const categories = [
  { Icon: FictionIcon, name: 'fiction', order: 1, mOrder: 1 },
  { Icon: DramaIcon, name: 'drama', order: 3, mOrder: 2 },
  { Icon: HumourIcon, name: 'humour', order: 5, mOrder: 3 },
  { Icon: PoliticsIcon, name: 'politics', order: 7, mOrder: 4 },
  { Icon: PhilosophyIcon, name: 'philosophy', order: 2, mOrder: 5 },
  { Icon: HostoryIcon, name: 'history', order: 4, mOrder: 6 },
  { Icon: AdventureIcon, name: 'adventure', order: 6, mOrder: 7 },
];

function Home() {
  const { t } = useTranslation();

  const globalContext = useGlobalContext();
  const { windowSize } = globalContext;
  console.log('windowSize', windowSize);

  const { colors } = useTheme();

  return (
    <div style={{ padding: 16 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 84,
          paddingBottom: 40,
          backgroundImage: `url(${Pattern})`,
        }}>
        <div>
          <div
            style={{
              justifySelf: 'flex-start',
              maxWidth: 900,
              fontSize: 48,
              fontFamily: 'Montserrat',
              fontWeight: 700,
              color: colors.primary,
            }}>
            {t('Hero-Title')}
          </div>
          <div
            style={{
              maxWidth: 900,
              fontSize: 20,
              fontFamily: 'Montserrat',
              fontWeight: 700,
              marginTop: 16,
            }}>
            {t('Hero-Sub-Title')}
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
            maxWidth: 900,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            padding: '40px 0px',
          }}>
          {categories
            .sort((a, b) => a.order - b.order)
            .map((category) => (
              <CategoryButton
                key={uuidv4()}
                {...category}
                name1={t(`topics.${category.name}`)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
