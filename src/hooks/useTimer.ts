import { useEffect, useState } from 'react'

export default function useTimer (time: number) {
  const [timer, setTimer] = useState(time * 60)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1)
    }, 1000)
    return () => { clearInterval(interval) }
  }, [timer])

  useEffect(() => {
    if (timer === 0) {
      setTimer(time * 60)
    }
  }, [timer])

  return { timer }
}
