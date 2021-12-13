import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Content from './Content.js';
import Account from './Account.js'
import axios from 'axios';

function Index() {
    const [openAccounts, setOpenAccounts] = useState(false);
    const [isAdmin, setIsAdmin] = useState();
    const location = useLocation();
    let navigate = useNavigate();


    function auth() {
        if (localStorage.getItem('auth_token')) {
            console.log("LOCATION",location.state.response);
            setIsAdmin(location.state.response.isAdmin);
        }
    }

    const logout = async (ev) => {
        ev.preventDefault();

        axios.post(`/api/logout`).then(response => {
            localStorage.removeItem('auth_name');
            localStorage.removeItem('auth_email');
            localStorage.removeItem('auth_token');
            Swal.fire(
                'Logging out!',
                response.data.message,
                'success'
            )
            navigate('/');
        })

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
                auth();
            } catch (e) {
                console.log(e);
            }
        };
        loadUser();
    }, []);

    return (
        <div>
            {localStorage.getItem('auth_token') ? (
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
                                        <h6 className="nav-link" role="button" onClick={accountsClicked} >{isAdmin ? ("Accounts") : (" ")}</h6>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <h6 className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {location.state.response.name}
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
                        <Account userData={location.state.response} />
                    ) : (
                        <Content userData={location.state.response} />
                    )}

                </div>
            ) : (
                "Page not Found"
            )}

        </div>
    );
}

export default Index;
