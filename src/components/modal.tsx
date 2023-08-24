import styles from './modal.module.css'

interface Props {
  statusGame: 'won' | 'lost'
  completedWords: string[]
  solution: string
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  timer: number
}

export const ModalP = ({ statusGame, completedWords, solution, showModal, setShowModal, timer }: Props) => {
  // console.log({ statusGame, completedWords, solution })

  const handleCLoseModal = () => { setShowModal(false) }

  return (
        <>
        {
          showModal && (
            <div className={styles.modalViewContainer}>
              <div className={styles.modalContainer}>
                  {/* <h2>You {statusGame === 'won' ? 'won' : 'lost'}</h2> */}
                  <h2>Estadisticas</h2>
                  <section className={styles.containesGameCount}>
                    <div className={styles.gameCount}>
                      <h3>8</h3>
                      <span>Juagadas</span>
                    </div>
                    <div className={styles.gameCount}>
                      <h3>2</h3>
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
