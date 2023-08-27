import { useContext } from 'react'
import { ThemeContext } from '../../context/themeContext'
import styles from './keyboard.module.css'
import stylesLight from './keyboardLightMode.module.css'

type Keys = Array<{
  letter: string
  status: string
}>

interface Props {
  keys: Keys
  onKeyPressed: (key: string) => void
}

export default function Keyboard ({ keys, onKeyPressed }: Props) {
  const { isDarkmode } = useContext(ThemeContext)

  const handleInput = (e: any) => {
    onKeyPressed(e.target.textContent)
  }
  const handleEnter = () => {
    onKeyPressed('ENTER')
  }
  const handleDelete = () => {
    onKeyPressed('BACKSPACE')
  }

  const changeStyle = (i: number) => {
    if (isDarkmode) {
      return ((keys[i].status.length > 0) ? styles[keys[i].status] : styles.key)
    }
    return ((keys[i].status.length > 0) ? stylesLight[keys[i].status] : stylesLight.key)
  }

  return (
    <div className={isDarkmode ? styles.keyboardContainer : stylesLight.keyboardContainer}>
        <div className={isDarkmode ? styles.emptyKey : stylesLight.emptyKey} />
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
        <div className={isDarkmode ? styles.emptyKey : stylesLight.emptyKey} />
        <div className={isDarkmode ? styles.emptyKeyMiddle : stylesLight.emptyKeyMiddle} />
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
        <button className={isDarkmode ? styles.enterKey : stylesLight.enterKey} onClick={handleEnter}>
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
        <button className={isDarkmode ? styles.deleteKey : stylesLight.deleteKey} onClick={handleDelete}>
            DELETE
        </button>
        <div className={isDarkmode ? styles.emptyKey : stylesLight.emptyKey} />
    </div>
  )
}
