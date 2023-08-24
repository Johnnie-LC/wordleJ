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

  return (
        <>
        {
          showModal && (
            <div className={styles.modalViewContainer}>
              <div className={styles.modalContainer}>
                  <h2>You {statusGame === 'won' ? 'won' : 'lost'}</h2>
              </div>
              <button onClick={() => {
                console.log('cll')
                setShowModal(false)
              } }>Aceptar</button>
            </div>
          )
        }
        </>
  )
}

export default ModalP
