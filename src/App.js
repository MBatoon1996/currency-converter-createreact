import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(faCalendar, faCoffee, fab);


const App = () => {
  return (
    <div>
      <h1 className="text-center m-3">Marques' Currency Converter</h1>
      <Home/>
      <footer>
        <FontAwesomeIcon icon={['fab', 'apple']} />
        <FontAwesomeIcon icon={['fab', 'microsoft']} />
        <FontAwesomeIcon icon={['fab', 'google']} />
        <FontAwesomeIcon icon={['fas', 'coffee']} />
        <FontAwesomeIcon icon="calendar"/>
        <FontAwesomeIcon icon="coffee" />
        <p>End</p>
      </footer>
    </div>
  )
}

export default App;
