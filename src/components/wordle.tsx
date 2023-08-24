import { useEffect, useState } from 'react'
import RowCompleted from './rowCompleted'
import RowCurrent from './rowCurrent'
import RowEmpty from './rowEmpty'
import { GameStatus } from './types.d'
import { useWindow } from '../hooks/useWindow'
import { KEYS } from './constants'
import { getWordOfTheDay } from '../service/request'
import styles from './wordle.module.css'
import Keyboard from './keyboard'

export default function Worlde () {
  const [wordOfTheDay, setWordOfTheDay] = useState<string>('')
  const [turn, setTurn] = useState<number>(1)
  const [currentWord, setCurrentWord] = useState<string>('')
  const [completedWords, setCompletedWords] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing)
  const [keyboardStatus, setKeyboardStatus] = useState(KEYS.map(key => ({ letter: key, status: '' })))

  useEffect(() => {
    setWordOfTheDay(getWordOfTheDay() as string)
  }, [])

  const onInput = (letter: string) => {
    const newWord = currentWord + letter
    setCurrentWord(newWord)
  }

  const onDelete = () => {
    const newWord = currentWord.slice(0, -1)
    setCurrentWord(newWord)
  }

  const onEnter = () => {
    if (currentWord === wordOfTheDay) {
      // gano el usuario
      setCompletedWords([...completedWords, currentWord])
      setGameStatus(GameStatus.Won)
      return undefined
    }

    if (turn === 5) {
      // perdion el usuario
      setCompletedWords([...completedWords, currentWord])
      setGameStatus(GameStatus.Lost)
      return undefined
    }

    setCompletedWords([...completedWords, currentWord])
    setTurn(turn + 1)
    setCurrentWord('')
  }

  const onKeyPressed = (key: string) => {
    if (gameStatus !== GameStatus.Playing) {
      return undefined
    }

    if (key === 'BACKSPACE' && currentWord.length > 0) {
      onDelete()
      return undefined
    }

    if (key === 'ENTER' && currentWord.length === 5 && turn <= 5) {
      onEnter()
      return undefined
    }

    if (currentWord.length >= 5) return undefined

    // ingresa la letra al estado
    if (KEYS.includes(key)) {
      onInput(key)
      return undefined
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase()
    onKeyPressed(key)
  }

  useWindow('keydown', handleKeyDown)

  return (
    <>
      <div className={styles.mainContainer}>
        {
          completedWords.map((word, i) => (
            <RowCompleted
            key={i}
            word={word}
            solution={wordOfTheDay}
            setKeyboardStatus={setKeyboardStatus}/>
          ))
        }
        {
          gameStatus === GameStatus.Playing
            ? <RowCurrent word={currentWord}/>
            : null
        }
        {
          Array.from(Array(5 - turn)).map((_, i) => (
            <RowEmpty key={i}/>
          ))
        }
      </div>
      <Keyboard keys={keyboardStatus} onKeyPressed={onKeyPressed} />
    </>
  )
}
