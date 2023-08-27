import styles from './header.module.css'
import DisplayModeSvg from '../svgComponents/displaymodeSvg'
import QuestionSvg from '../svgComponents/questionsSvg'
import StatisticSvg from '../svgComponents/statisticsSvg'
import { useContext, memo } from 'react'
import { ThemeContext } from '../../context/themeContext'

interface Props {
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>
}

// eslint-disable-next-line react/display-name
export const Header = memo(({ setShowStatistics, setShowInstructions }: Props) => {
  const { isDarkmode, togglekMode } = useContext(ThemeContext)

  const handleShowStatistics = () => { setShowStatistics(item => !item) }
  const handleShowInstructions = () => { setShowInstructions(item => !item) }

  return (
        <div className={isDarkmode ? styles.headerContainerStyle : styles.headerContainerLigthStyle}>
            <ul className={styles.ulStyle}>
                <li style={{ paddingRight: '65px' }}>
                  <button onClick={handleShowInstructions}>
                    <QuestionSvg width='27' isDarkmode={isDarkmode}/>
                  </button>
                </li>

                <li style={{ fontSize: '30px' }}>WORDLE</li>

                <li>
                    <button onClick={handleShowStatistics}>
                      <StatisticSvg width='32' height='30' isDarkmode={isDarkmode}/>
                    </button>
                    <button onClick={() => { togglekMode() }}>
                      <DisplayModeSvg width={30} height={18} darkMode={isDarkmode}/>
                    </button>
                </li>
            </ul>
        </div>
  )
})
export default Header
