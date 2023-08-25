import styles from './header.module.css'
import DisplayModeSvg from '../svgComponents/displaymodeSvg'
import QuestionSvg from '../svgComponents/questionsSvg'
import StatisticSvg from '../svgComponents/statisticsSvg'

interface Props {
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>
  setShowInstructions: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header ({ setShowStatistics, setShowInstructions }: Props) {
  const handleShowStatistics = () => { setShowStatistics(item => !item) }
  const handleShowInstructions = () => { setShowInstructions(item => !item) }

  return (
        <div className={styles.headerContainerStyle}>
            <ul className={styles.ulStyle}>
                <li style={{ paddingRight: '65px' }}>
                  <button onClick={handleShowInstructions}>
                    <QuestionSvg width='27'/>
                  </button>
                </li>

                <li style={{ fontSize: '30px' }}>WORDLE</li>

                <li>
                    <button onClick={handleShowStatistics}>
                      <StatisticSvg width='32' height='30'/>
                    </button>
                    <button>
                      <DisplayModeSvg width={30} height={18} darkMode={true}/>
                    </button>
                </li>
            </ul>
        </div>
  )
}
