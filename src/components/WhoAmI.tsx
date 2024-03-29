import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { ThemeContext } from '../context/ThemeContext'
import { sizeMedia } from '../styles/mediaQuery'
import { ThemeColors } from '../context/themeColors'
import { useThemeStore } from '../store/useThemeStore'

export const WhoAmI = () => {
  const themeColors = useThemeStore((state) => state.themeColors)
  return (
    <WhoIamContainer themeColors={themeColors}>
      <h3>
        <FormattedMessage id="app.whoami" />
      </h3>
      <p
        style={{
          textAlign: 'center',
          fontSize: '18px',
        }}
      >
        <FormattedMessage id="app.about" />
      </p>
    </WhoIamContainer>
  )
}

const WhoIamContainer = styled.div<{
  themeColors: ThemeColors
}>`
    margin: auto;
    margin-top:40px;
    width: 740px;
    padding: 30px;

    @media ${sizeMedia('xs_sm')} {
        width: 90%;
        padding: 1rem;
        margin-top: 0;
    }
    /* @media ${sizeMedia('sm')} {
        width: 90%;
        padding: 1rem;
        margin-top: 2rem;
    } */
    
    h3{
        font-size: 1.8rem;
        color : ${({ themeColors }) => themeColors.titleColor};
        text-align: center;
        margin: 1.5rem;
    }
    p{
        color : ${({ themeColors }) => themeColors.textColor};
        font-weight: 400;
    }
`
