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
      <footer className="pt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 row justify-content-center">
              <div id="socialContainer" className="pb-2">
                <a href="https://www.instagram.com/batoonworld/" rel="noreferrer" target="_blank" className="mx-1">
                  <FontAwesomeIcon icon={['fab', 'instagram']} />
                </a>
                <a href="https://twitter.com/batoonworld" rel="noreferrer" target="_blank" className="mx-1">
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                </a>
                <a href="https://www.github.com/MBatoon1996" rel="noreferrer" target="_blank" className="mx-1">
                  <FontAwesomeIcon icon={['fab', 'github']} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <p id="copyright" className="text-center">©2021 Marques Batoon</p>
      </footer>
    </div>
  )
}

export default App;
