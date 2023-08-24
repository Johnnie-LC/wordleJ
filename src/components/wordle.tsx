import { useEffect, useState } from 'react'
import RowCompleted from './rowCompleted'
import RowCurrent from './rowCurrent'
import RowEmpty from './rowEmpty'
import { GameStatus } from './types.d'
import { useWindow } from '../hooks/useWindow'
import { KEYS } from './constants'
import styles from './wordle.module.css'
import Keyboard from './keyboard'
import ShowTime from './time'
import useTimerInMinutes from '../hooks/useTimer'
import Header from './header'
import ModalP from './modal'

interface Props {
  words: string[]
}

export default function Worlde ({ words }: Props) {
  const [randomWord, setRandomWord] = useState<string>('')
  const [turn, setTurn] = useState<number>(1)
  const [currentWord, setCurrentWord] = useState<string>('')
  const [completedWords, setCompletedWords] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing)
  const [keyboardStatus, setKeyboardStatus] = useState(KEYS.map(key => ({ letter: key, status: '' })))
  const { timer } = useTimerInMinutes(5)

  const [showModal, setShowModal] = useState<boolean>(true)

  useEffect(() => {
    if (words.length > 0) {
      setRandomWord(words[Math.floor(Math.random() * words.length)].toUpperCase())
    }
  }, [words])

  useEffect(() => {
    if (timer === 0) {
      setCompletedWords([])
      setTurn(1)
      setCurrentWord('')
      setGameStatus(GameStatus.Playing)
      setKeyboardStatus(KEYS.map(key => ({ letter: key, status: '' })))
      setRandomWord(words[Math.floor(Math.random() * words.length)].toUpperCase())
    }
  }, [timer])

  const onInput = (letter: string) => {
    const newWord = currentWord + letter
    setCurrentWord(newWord)
  }

  const onDelete = () => {
    const newWord = currentWord.slice(0, -1)
    setCurrentWord(newWord)
  }

  const onEnter = () => {
    if (currentWord === randomWord) {
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
      <Header />
      {
        gameStatus === GameStatus.Won
          ? (
        <ModalP
        statusGame='won'
        completedWords={completedWords}
        solution={randomWord}
        showModal={showModal}
        setShowModal={setShowModal}
        />)
          : gameStatus === GameStatus.Lost
            ? (
            <ModalP
                statusGame='lost'
                completedWords={completedWords}
                solution={randomWord}
                showModal={showModal}
                setShowModal={setShowModal} />)
            : null
      }
      <div className={styles.mainContainer}>
        {
          completedWords.map((word, i) => (
            <RowCompleted
            key={i}
            word={word}
            solution={randomWord}
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
      <ShowTime word={randomWord} timer={timer}/>
    </>
  )
}
