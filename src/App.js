import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Games from './components/Games/Games';
import TopStreams from './components/TopStreams/TopStreams';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Live from './components/Live/Live';
import gameStreams from './components/GameStream/GameStream';
import Results from './components/Results/Results'




function App() {
  return (

    <Router>



      <div className="App">
        <Header/>
        <Sidebar/>
        <Switch>
          <Route exact path='/' component={Games}/>
          <Route path='/top-streams' component={TopStreams}/>
          <Route exact path='/live/:slug' component={Live}/>
          <Route exact path='/game/:slug' component={gameStreams}/>
          <Route exact path='/resultats/:slug' components={Results}/>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
