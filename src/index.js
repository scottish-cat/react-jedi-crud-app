import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Planets from './Planets';
import People from './People';
import Starships from './Starships';
import NavBar from './components/common/Navbar';

const navItems = [
  {name: 'People', link: '/'},
  {name: 'Planets', link: '/planets'},
  {name: 'Starships', link: '/starships'}
]

ReactDOM.render(
  <React.StrictMode>
    <NavBar name='JEDI' items={navItems}/>
    <Router>
       <Switch>
         <Redirect exact from="/" to="/people"/>
         <Route exact path="/people" component={People} />
         <Route exact path="/planets" component={Planets} />
         <Route exact path="/starships" component={Starships} /> */}
       </Switch>
     </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
