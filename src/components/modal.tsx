import styles from './modal.module.css'

interface Props {
  statusGame: 'won' | 'lost'
  completedWords: string[]
  solution: string
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalP = ({ statusGame, completedWords, solution, showModal, setShowModal }: Props) => {
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
                  <section>
                    Siguiente Palabra
                  </section>
                  <section>
                    <button onClick={handleCLoseModal}>Aceptar</button>
                  </section>
              </div>
            </div>
          )
        }
        </>
  )
}

export default ModalP
