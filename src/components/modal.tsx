import styles from './modal.module.css'

interface Props {
  statusGame: 'won' | 'lost'
  completedWords: string[]
  solution: string
}

export const ModalP = ({ statusGame, completedWords, solution }: Props) => {
  console.log({ statusGame, completedWords, solution })

  return (
        <div className={styles.modalViewContainer}>
            <div className={styles.modalContainer}>
                <h2>You {statusGame === 'won' ? 'won' : 'lost'}</h2>
                <div className={styles.puzzle}>
                    hola
                </div>
            </div>
        </div>
  )
}

export default ModalP
