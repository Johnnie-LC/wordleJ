import { useContext } from 'react'
import styles from '../modal.module.css'
import stylesLight from '../modalLight.module.css'
import { ThemeContext } from '../../context/themeContext'

interface Props {
  statusGame: 'won' | 'lost'
  winCounter: number
  amountOfGames: number
  solution: string
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  timer: number
}

export const StatisticsModal = ({ statusGame, winCounter, amountOfGames, solution, showModal, setShowModal, timer }: Props) => {
  const handleCLoseModal = () => { setShowModal(false) }
  const { isDarkmode } = useContext(ThemeContext)
  return (
        <>
        {
          showModal && (
            <div className={isDarkmode ? styles.modalViewContainer : stylesLight.modalViewContainer}>
              <div className={isDarkmode ? styles.modalContainer : stylesLight.modalContainer}>
                  <h2>Estadisticas</h2>

                  <section className={isDarkmode ? styles.containesGameCount : stylesLight.containesGameCount}>
                    <div className={isDarkmode ? styles.gameCount : stylesLight.gameCount}>
                      <h3>{amountOfGames}</h3>
                      <span>Juagadas</span>
                    </div>

                    <div className={isDarkmode ? styles.gameCount : stylesLight.gameCount}>
                      <h3>{winCounter}</h3>
                      <span>Victorias</span>
                    </div>

                  </section>

                  {
                    statusGame === 'lost' && (
                      <section>La palabra era: {solution}</section>
                    )
                  }

                  <section className={isDarkmode ? styles.gameCount : stylesLight.gameCount}>
                    <span>Siguiente Palabra</span>
                    <span>{Math.floor(timer / 60) }:{timer % 60}</span>
                  </section>

                  <section>
                    <button className={isDarkmode ? styles.acceptButton : stylesLight.acceptButton} onClick={handleCLoseModal}>Aceptar</button>
                  </section>
              </div>
            </div>
          )
        }
        </>
  )
}

export default StatisticsModal
