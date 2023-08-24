import Worlde from './components/wordle'
import './App.css'
import useFetchWords from './hooks/useFetchWords'

function App () {
  const { words } = useFetchWords(5)

  return (<Worlde words={words}/>)
}

export default App
