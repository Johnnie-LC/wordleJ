import styles from '../modal.module.css'
import Instructions from './instructions'

interface Props {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const InstructionsModal = ({ showModal, setShowModal }: Props) => {
  const handleCLoseModal = () => { setShowModal(item => !item) }
  return (
          <>
          {
            showModal && (
              <div className={styles.modalViewContainer}>
                <div className={styles.modalContainerInstructions}>
                    <Instructions />
                    <section>
                        <button className={styles.acceptButton} onClick={handleCLoseModal}>!Jugar¡</button>
                    </section>
                </div>
              </div>
            )
          }
          </>
  )
}
export default InstructionsModal
