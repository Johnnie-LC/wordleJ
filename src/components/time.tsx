interface Props {
  words: string[]
  timer: number
}
export default function ShowTime ({ words, timer }: Props) {
  return (
      <div style={{ background: 'white' }}>
        <p>
          Tiempo restante: <strong>{Math.floor(timer / 60) } minutos, {timer % 60} segundos</strong>
        </p>
      </div>
  )
}
