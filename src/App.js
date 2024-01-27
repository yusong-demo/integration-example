import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [visible, setVisible] = useState(false)

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
          <p>
            version
            {process.env.REACT_APP_VERSION}
          </p>
        </a>
        <div>
          <button id='btn' onClick={() => setVisible(!visible)}>setVisible</button>
          {visible && (
            <p id='result'>Hello world</p>
          )}
        </div>
      </header>
    </div>
  )
}

export default App
