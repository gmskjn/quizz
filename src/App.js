// import logo from './logo.svg';
import Logo from './Components/assetsLogo';

//Styles Import ...................
import './assets/styles/css/main.css';
import './assets/styles/scss/main.scss';


//Router Import ....................
import {BrowserRouter, Switch , Route} from 'react-router-dom';
// import { Route, Switch } from 'react-router-dom';

//Views Import ....................
import HomeView from './Views/homeView';
import QuizzView from './Views/quizzView';
import Four04View from './Views/four04View';

function App() {
  return (
    <div className="App">
      <header className="qz-app-header">
      <Logo></Logo>
      </header>
      <BrowserRouter>
        <Switch>
                <Route exact path="/" component={HomeView} />
                <Route excat path="/quizz" component={QuizzView} />
                <Route component={Four04View} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
