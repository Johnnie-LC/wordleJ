import styles from './header.module.css'

interface Props {
  setShowStatistics: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Header ({ setShowStatistics }: Props) {
  const handleShowStatistics = () => { setShowStatistics(item => !item) }

  return (
        <div className={styles.headerContainerStyle}>
            <ul className={styles.ulStyle}>
                <li style={{
                  paddingRight: '65px'
                }}>
                <button>Questions</button>
                </li>
                <li style={{
                  fontSize: '30px'
                }}>WORDLE</li>
                <li>
                    <button onClick={handleShowStatistics}>Stadisticas</button>
                    <button>toggle</button>
                </li>
            </ul>
        </div>
  )
}
