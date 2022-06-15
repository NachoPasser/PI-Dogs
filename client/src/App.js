import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx'
import Home from './components/Home/Home.jsx';
import Detail from './components/Detail/Detail.jsx'
import Form from './components/Form/Form.jsx'
import './App.css';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route path='/create' component={Form}/>
      <Route exact path='/dog/:id' component={Detail} />
      <Route path='/home' component={Home}/>
      <Route path='/' component={Landing}/>
    </Switch>
    </div>
  );
}

export default App;
