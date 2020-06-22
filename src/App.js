import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Planets from './components/pages/Planets';
import People from './components/pages/People';
import Starships from './components/pages/Starships';
import Person from './components/pages/Person';
import Planet from './components/pages/Planet';
import Starship from './components/pages/Starship';
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
                <Route exact path="/people/:id" component={Person} />
                <Route exact path="/planets/:id" component={Planet} />
                <Route exact path="/starships/:id" component={Starship} />
                <Route component={NotFound} />
             </Switch>
           </Router>
        </React.StrictMode>
        );
}

export default App;
