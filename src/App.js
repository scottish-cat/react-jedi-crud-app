import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Planets from './components/pages/Planets';
import People from './components/pages/People';
import Starships from './components/pages/Starships';
import NotFound from './components/pages/NotFound';
import NavBar from './components/navbar/Navbar';

const navItems = [
  {name: 'People', link: '/'},
  {name: 'Planets', link: '/planets'},
  {name: 'Starships', link: '/starships'}
]

function App() {
    return (
        <React.StrictMode>
          <NavBar name='JEDI' items={navItems}/>
          <Router>
             <Switch>
                <Redirect exact from="/" to="/people"/>
                <Route exact path="/people" component={People} />
                <Route exact path="/planets" component={Planets} />
                <Route exact path="/starships" component={Starships} />
                <Route component={NotFound} />
             </Switch>
           </Router>
        </React.StrictMode>
        );
}

export default App;
