import './App.css'
import Column from './components/Column'

function App() {

  return (
    <>
      <header>
        <div className='title'>Product Roadmap</div>
      </header>

      <article id='content'>
        <Column columnClass='column-group-1' columnTitle='Group Task 1' columnMonth='January - March' />
        <Column columnClass='column-group-2' columnTitle='Group Task 2' columnMonth='April - June' />
        <Column columnClass='column-group-3' columnTitle='Group Task 3' columnMonth='July - September' />
        <Column columnClass='column-group-4' columnTitle='Group Task 4' columnMonth='October - December' />
      </article>
    </>
  )
}

export default App
