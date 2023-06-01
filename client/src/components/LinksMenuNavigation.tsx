import { useContext, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import { ThemeColors } from '../context/themeColors'
import { sizeMedia } from '../styles/mediaQuery'
import { useWindowSize } from '../hooks/useWindowsSize'

export const LinksMenuNavigation = () => {
  const { themeColors, toogleMenu, openMenu, closeMenu } = useContext(
    ThemeContext,
  )

  const { windowSize } = useWindowSize()

  const linkClickeable = () => {
    if (windowSize.width <= 768) {
      closeMenu()
    } else {
      return
    }
  }
  useEffect(() => {
    if (windowSize.width < 768) {
      closeMenu()
    } else {
      openMenu()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize.width])

  const links = [
    {
      hash: '#home',
      text: 'app.home',
    },
    {
      hash: '#tecnologies',
      text: 'app.technologies',
    },
    {
      hash: '#projects',
      text: 'app.projects',
    },
    {
      hash: '#apps',
      text: 'app.apps',
    },
    {
      hash: '#contact',
      text: 'app.contact',
    },
  ]
  return (
    <LinkContainer
      className={toogleMenu ? 'menu-active' : 'menu-desactive'}
      themeColors={themeColors}
    >
      {links.map((link, index) => (
        <a key={index} href={link.hash} onClick={linkClickeable}>
          <FormattedMessage id={link.text} />
        </a>
      ))}
    </LinkContainer>
  )
}

const LinkContainer = styled.div<{
  themeColors: ThemeColors
}>`
  a {
    color: white;
    margin-left: 30px;
    font-family: 'Open Sans';
    &:hover {
      color: #2a2a2a;
    }
  }
  @media ${sizeMedia('xs_sm')} {
    transition: 0.3s ease all;
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    justify-content: space-around;
    background: ${({ themeColors }) => themeColors.primaryColor};
    align-items: center;
    opacity: 0.9;
    left: 0;
    top: 0;
  }
`
