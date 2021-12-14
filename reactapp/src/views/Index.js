import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import Content from './Content.js';
import Account from './Account.js';
import NotFound from './NotFound.js';
import axios from 'axios';

function Index() {
    const [openAccounts, setOpenAccounts] = useState(false);
    const [isAdmin, setIsAdmin] = useState();
    const [name, setName] = useState("");
    const [isLogged, setIsLogged] = useState(false);
    const [response, setResponse] = useState({
        created_at: "",
        email: "",
        email_verified: "",
        id: 0,
        isAdmin: 0,
        name: "",
        updated_At: "",
        token: "",
    })
    const location = useLocation();
    let navigate = useNavigate();

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
                if (localStorage.getItem('auth_token')) {
                    setIsAdmin(location.state.response.isAdmin);
                    setName(location.state.response.name);
                    setIsLogged(location.state.isLogged);
                    setResponse({
                        created_at: location.state.response.created_at,
                        email: location.state.response.email,
                        email_verified_at: location.state.response.email_verified_at,
                        id: location.state.response.id,
                        isAdmin: location.state.response.isAdmin,
                        name: location.state.response.name,
                        updated_At: location.state.response.updated_at,
                        token: localStorage.getItem('auth_token'),
                        isLogged: location.state.isLogged,
                    });
                    console.log("AAA",location);
                }
            } catch (e) {
                console.log(e);
            }
        };
        loadUser();
    }, []);

    return (
        <div>
            {localStorage.getItem('auth_token') && isLogged ? (
                <div>
                    <nav className="sticky-top navbar navbar-expand-lg navbar-light bg-white shadow-sm">
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
                                </ul>
                            </div>
                            <div>
                                <ul className="navbar-nav dropdown">
                                    <li className="nav-item">
                                        <h6 className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {name}
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
                        <Account userData={response} />
                    ) : (
                        <Content userData={response} />
                    )}

                </div>
            ) : (
                <NotFound />
            )}

        </div>
    );
}

export default Index;
