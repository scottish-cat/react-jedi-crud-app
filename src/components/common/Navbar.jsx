import React from 'react';

const Navbar = ({name, items}) => {
    return (
        <nav className="navbar navbar-dark navbar-expand bg-dark">
            <span className="navbar-brand">{name}</span>
            <div className="navbar-nav">
                {items.map(navItem => (
                    <a key={navItem.name} className="nav-item nav-link" href={navItem.link}>{navItem.name}</a>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
