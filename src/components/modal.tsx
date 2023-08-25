import styles from './modal.module.css'

interface Props {
  statusGame: 'won' | 'lost'
  winCounter: number
  amountOfGames: number
  solution: string
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  timer: number
}

export const ModalP = ({ statusGame, winCounter, amountOfGames, solution, showModal, setShowModal, timer }: Props) => {
  const handleCLoseModal = () => { setShowModal(false) }

  return (
        <>
        {
          showModal && (
            <div className={styles.modalViewContainer}>
              <div className={styles.modalContainer}>
                  <h2>Estadisticas</h2>

                  <section className={styles.containesGameCount}>
                    <div className={styles.gameCount}>
                      <h3>{amountOfGames}</h3>
                      <span>Juagadas</span>
                    </div>
                    <div className={styles.gameCount}>
                      <h3>{winCounter}</h3>
                      <span>Victorias</span>
                    </div>
                  </section>

                  {
                    statusGame === 'lost' && (
                      <section>La palabra era: {solution}</section>
                    )
                  }

                  <section className={styles.gameCount}>
                    <span>Siguiente Palabra</span>
                    <span>{Math.floor(timer / 60) }:{timer % 60}</span>
                  </section>

                  <section>
                    <button className={styles.acceptButton} onClick={handleCLoseModal}>Aceptar</button>
                  </section>
              </div>
            </div>
          )
        }
        </>
  )
}

export default ModalP
