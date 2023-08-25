import { type SetKeyboardStatus, type BoxStatus } from './types.d'

import styles from './box.module.css'
import { useEffect } from 'react'

interface Props {
  value: string
  status: BoxStatus
  setKeyboardStatus: SetKeyboardStatus
}

export default function Box ({ value, status, setKeyboardStatus }: Props) {
  useEffect(() => {
    if (status === 'absent' || status === 'present' || status === 'correct') {
      setKeyboardStatus(keys => {
        const newKeys = keys.map(key => {
          if (key.letter === value) {
            return { letter: key.letter, status }
          }
          return key
        })
        return [...newKeys]
      })
    }
  }, [status])

  return <div className={styles[status]}>{value}</div>
}
