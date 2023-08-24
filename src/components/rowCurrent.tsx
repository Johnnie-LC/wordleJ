import Box from './box'
import styles from './row.module.css'

interface Props {
  word: string
}

export default function RowCurrent ({ word }: Props) {
  return (
    <div className={styles.row}>
        {
            word.split('').map((letter, i) => (
                <Box key={i} value={letter} status='edit' />
            ))
        }
        {
            Array.from(Array(5 - word.length)).map((_, i) => (
                <Box key={i} value='' status='edit' />
            ))
        }
    </div>
  )
}
