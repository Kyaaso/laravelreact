import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Content from './Content.js';
import Account from './Account.js'

function Index() {
    const [isLogged, setIsLogged] = useState(false);
    const [openAccounts, setOpenAccounts] = useState(false);
    const [userData, setUserData] = useState();
    const location = useLocation();
    let navigate = useNavigate();

    const logout = async (ev) => {
        ev.preventDefault();
        Swal.fire(
            'Logging out!',
            'Thank you for visiting us',
            'success'
        )
        setIsLogged(false);
        navigate('/');
    }

    const homeCliked = async (ev) => {
        ev.preventDefault();

        setOpenAccounts(false);
    }

    const accountsClicked = async (ev) => {
        ev.preventDefault();

        setOpenAccounts(true);
    }

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
                                        <h6 className="nav-link active" role="button" onClick={homeCliked} aria-current="page">Home</h6>
                                    </li>
                                    <li className="nav-item">
                                        <h6 className="nav-link" role="button" onClick={accountsClicked} >{userData.isAdmin ? ("Accounts") : (" ")}</h6>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <h6 className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {userData.name}
                                        </h6>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li><h6 onClick={logout} role="button" className="nav-link">Logout</h6></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    {openAccounts ? (
                        <Account userData={userData} />
                    ) : (
                        <Content />
                    )}

                </div>
            ) : (
                "Page not Found"
            )}

        </div>
    );
}

export default Index;
