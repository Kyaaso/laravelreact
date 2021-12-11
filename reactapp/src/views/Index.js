import React, { useState, useEffect } from 'react';
import Content from './Content.js'
import { Link, useLocation } from 'react-router-dom';

function Index() {
    const [isLogged, setIsLogged] = useState(false);
    const [userData, setUserData] = useState();
    const location = useLocation();

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (location.state !== null) {
                    setUserData(location.state.response.data);
                    setIsLogged(true);
                }
            } catch (e) {
                console.log(e);
            }
        };
        loadUser();
    }, []);

    return (
        <div>
            {isLogged ? (
                <div>
                    <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-white">
                        <div className="container">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <span className="nav-link active" aria-current="page">Home</span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link">{userData.isAdmin ? ("Accounts") : (" ")}</span>
                                    </li>
                                    <li className="nav-item">
                                        <span className="nav-link">Logout</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Content />
                </div>
            ) : (
                "Page not Found"
            )}

        </div>
    );
}

export default Index;
