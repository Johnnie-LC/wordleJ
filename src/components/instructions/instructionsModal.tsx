import { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext'
import styles from '../modal.module.css'
import stylesLight from '../modalLight.module.css'
import Instructions from './instructions'

interface Props {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const InstructionsModal = ({ showModal, setShowModal }: Props) => {
  const { isDarkmode } = useContext(ThemeContext)
  const handleCLoseModal = () => { setShowModal(item => !item) }
  return (
          <>
          {
            showModal && (
              <div className={isDarkmode ? styles.modalViewContainer : stylesLight.modalViewContainer}>
                <div className={isDarkmode ? styles.modalContainerInstructions : stylesLight.modalContainerInstructions}>
                    <Instructions />
                    <section>
                        <button className={isDarkmode ? styles.acceptButton : stylesLight.acceptButton} onClick={handleCLoseModal}>!Jugar¡</button>
                    </section>
                </div>
              </div>
            )
          }
          </>
  )
}
export default InstructionsModal
