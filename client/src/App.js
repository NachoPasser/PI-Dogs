import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx'
import Home from './components/Home/Home.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path='/home' component={Home}/>
      <Route path='/' component={Landing}/>
    </Switch>
    </div>
  );
}

export default App;
