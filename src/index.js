import React from 'react';
import ReactDOM from 'react-dom';
import Planets from './Planets';
import NavBar from './components/common/Navbar';

const navItems = [
  {name: 'People', link: '/'},
  {name: 'Planets', link: '/planets'},
  {name: 'Starships', link: '/starships'}
]

ReactDOM.render(
  <React.StrictMode>
    <NavBar name='JEDI' items={navItems}/>
    <Planets />
  </React.StrictMode>,
  document.getElementById('root')
);
