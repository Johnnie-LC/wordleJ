import { useContext, useEffect, useState } from 'react'
import { GameStatus } from '../types.d'
import { useWindow } from '../../hooks/useWindow'
import { KEYS } from '../constants'
import Keyboard from '../keyboard/keyboard'
import useTimerInMinutes from '../../hooks/useTimer'
import Header from '../header/header'
import Statistics from '../statistics/statistics'
import Instructions from '../instructions/instructionsModal'
import GameBox from '../gameBox/gameBox'
import styles from './wordle.module.css'
import { ThemeContext } from '../../context/themeContext'

interface Props {
  words: string[]
}

export default function Worlde ({ words }: Props) {
  const { isDarkmode } = useContext(ThemeContext)

  const [randomWord, setRandomWord] = useState<string>('')
  const [turn, setTurn] = useState<number>(1)
  const [currentWord, setCurrentWord] = useState<string>('')
  const [completedWords, setCompletedWords] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing)
  const [keyboardStatus, setKeyboardStatus] = useState(KEYS.map(key => ({ letter: key, status: '' })))
  const { timer } = useTimerInMinutes(5)

  const [winCounter, setWinCounter] = useState(0)
  const [amountOfGames, setAmountOfGames] = useState(0)

  const [showStatistics, setShowStatistics] = useState<boolean>(false)
  const [showInstructions, setShowInstructions] = useState<boolean>(true)

  useEffect(() => {
    if (gameStatus === GameStatus.Won) {
      setWinCounter(winCounter + 1)
    }

    if (gameStatus === GameStatus.Lost || gameStatus === GameStatus.Won) {
      setShowStatistics(true)
      setAmountOfGames(amountOfGames + 1)
    }
  }, [gameStatus])

  useEffect(() => {
    if (words.length > 0) {
      setRandomWord(words[Math.floor(Math.random() * words.length)].toUpperCase())
    }
  }, [words])

  useEffect(() => {
    if (timer === 0) {
      setShowStatistics(true)
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
    <div className={isDarkmode ? styles.wordleMainContainer : styles.wordleMainContainerLight}>
      <div className={styles.wordleContainer}>
      <Header setShowStatistics={setShowStatistics} setShowInstructions={setShowInstructions}/>
      <Instructions showModal={showInstructions} setShowModal={setShowInstructions}/>
      {
        gameStatus === GameStatus.Playing && showStatistics && (
          <Statistics
              statusGame='won'
              winCounter={winCounter}
              amountOfGames={amountOfGames}
              solution={randomWord}
              showModal={showStatistics}
              setShowModal={setShowStatistics} timer={timer} />
        )
      }
      {
        gameStatus === GameStatus.Won && (
          <Statistics
              statusGame='won'
              winCounter={winCounter}
              amountOfGames={amountOfGames}
              solution={randomWord}
              showModal={showStatistics}
              setShowModal={setShowStatistics} timer={timer} />
        )
      }
      {
        gameStatus === GameStatus.Lost && (
          <Statistics
                statusGame='lost'
                winCounter={winCounter}
                amountOfGames={amountOfGames}
                solution={randomWord}
                showModal={showStatistics}
                setShowModal={setShowStatistics} timer={timer} />
        )
      }
      <GameBox
      completedWords={completedWords}
      gameStatus={gameStatus}
      randomWord={randomWord}
      setKeyboardStatus={setKeyboardStatus}
      currentWord={currentWord}
      turn={turn}
      />
      <Keyboard keys={keyboardStatus} onKeyPressed={onKeyPressed} />
    </div>
  </div>
  )
}
