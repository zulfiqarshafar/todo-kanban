import './App.css'
import Board from './components/Board'

function App() {

  return (
    <>
      <header>
        <div className='title'>Product Roadmap</div>
      </header>

      <article id='content'>
        <Board />
        <Board />
        <Board />
        <Board />
      </article>
    </>
  )
}

export default App
