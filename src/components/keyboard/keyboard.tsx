import styles from './keyboard.module.css'

type Keys = Array<{
  letter: string
  status: string
}>

interface Props {
  keys: Keys
  onKeyPressed: (key: string) => void
}

export default function Keyboard ({ keys, onKeyPressed }: Props) {
  const handleInput = (e: any) => {
    onKeyPressed(e.target.textContent)
  }
  const handleEnter = () => {
    onKeyPressed('ENTER')
  }
  const handleDelete = () => {
    onKeyPressed('BACKSPACE')
  }

  const changeStyle = (i: number) => ((keys[i].status.length > 0) ? styles[keys[i].status] : styles.key)

  return (
    <div className={styles.keyboardContainer}>
        <div className={styles.emptyKey} />
        {
            Array.from(Array(10)).map((_, i) => (
                <button
                key={i}
                className={changeStyle(i)}
                onClick={handleInput}>
                    {keys[i].letter}
                </button>
            ))
        }
        <div className={styles.emptyKey} />
        <div className={styles.emptyKeyMiddle} />
        {
            Array.from(Array(10)).map((_, i) => (
                <button
                key={i + 10}
                className={changeStyle(i + 10)}
                onClick={handleInput}>
                    {keys[i + 10].letter}
                </button>
            ))
        }
        <button className={styles.enterKey} onClick={handleEnter}>
            ENTER
        </button>
        {
            Array.from(Array(7)).map((_, i) => (
                <button
                key={i + 20}
                className={changeStyle(i + 20)}
                onClick={handleInput}>
                    {keys[i + 20].letter}
                </button>
            ))
        }
        <button className={styles.deleteKey} onClick={handleDelete}>
            DELETE
        </button>
        <div className={styles.emptyKey} />
    </div>
  )
}
