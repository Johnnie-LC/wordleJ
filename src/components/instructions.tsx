import styles from './instruction.module.css'
import boxStyles from './box.module.css'
import { type BoxStatus } from './types.d'

export default function Instructions () {
  const createArrayBox = (word: string, solution: string, status: BoxStatus, statusAbsent = false) => {
    function checkLetter (letter: string, pos: number): BoxStatus {
      if (solution.includes(letter)) {
        if (solution[pos] === letter) {
          return statusAbsent ? 'absent' : 'correct'
        } else {
          return 'present'
        }
      } else {
        return status
      }
    }

    return (
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
        {
            Array.from(Array(5)).map((_, i) => (
            <div
            key={i}
            style={{
              width: '55px',
              height: '55px'
            }}
            className={boxStyles[checkLetter(word[i], i)]}>{word[i]}</div>))
        }
        </div>
    )
  }
  const resume = [
    'Adivina la palabra oculta en cinco intentos',
    'Cada intento debe ser una palabra válida de 5 letras',
    'Despues de cada intento el color de las letras cambia para mostrar que tan cerca estás de acertar la palabras'
  ]
  const examples = [
    {
      case: 'La letra G esta en la palabra y en la posición correcta',
      example: createArrayBox('GATOS', 'GELIE', 'empty')
    },
    {
      case: 'La letra C esta en la palabra pero en la posición incorrecta',
      example: createArrayBox('VOCAL', 'CINTI', 'empty')
    },
    {
      case: 'La letra O no está en la palabra',
      example: createArrayBox('CANTO', '----O', 'empty', true)
    }
  ]
  return (
        <section className={styles.container}>
            <h2>Cómo Jugar</h2>
            <div>
                {
                    resume.map((item, i) => (
                        <p key={i}>
                            {item}
                        </p>
                    ))
                }
            </div>
            <div>
                <h3>Ejemplos</h3>
                {
                    examples.map((item, i) => (
                        <div key={i}>
                            <div>{item.example}</div>
                            <p>{item.case}</p>
                        </div>
                    ))
                }
            </div>
            <div>
                <p>Puede haber letras repetidas. Las pistas son independientes para cada letra</p>
            </div>
            <div style={{
              margin: '42px 0'
            }}>
                <p style={{
                  textAlign: 'center'
                }}>
                    !Una palabra nueva cada 5 minutos¡
                </p>
            </div>
        </section>
  )
}
