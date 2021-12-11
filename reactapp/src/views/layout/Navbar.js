import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar()  {

    return (
        <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid">
                <span className="navbar-brand">Navbar</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="nav-link active" aria-current="page">Home</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Accounts</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">yawa ra</span>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link">Logout</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

