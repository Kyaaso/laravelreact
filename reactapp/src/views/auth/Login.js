import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import NotFound from '../NotFound';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCred, setInvalidCred] = useState('');
    const [errorList, setErrorList] = useState([]);
    let navigate = useNavigate();
    let location = useLocation();

    const userLogin = async (ev) => {
        ev.preventDefault();
        const request = ({
            email: email,
            password: password,
        });
        const response = await axios.post('http://127.0.0.1:8000/api/login', request);
        if (response.data.status === 200) {
            var userData = response.data
            localStorage.setItem('auth_name', userData.data.name);
            localStorage.setItem('auth_token', userData.token);
            localStorage.setItem('auth_email', userData.data.email);
            Swal.fire(
                'Success',
                response.data.message,
                'success'
            );
            navigate('/index', { state: { response: userData.data, isLogged: true } });
        } else if (response.data.status === 422) {
            setErrorList(response.data.message);
        } else if (response.data.status === 401) {
            Swal.fire(
                'Oh no!',
                response.data.message,
                'warning'
            )
            setInvalidCred(response.data.message);
        }
    }

    return (
        <div>
            {!localStorage.getItem('auth_token') && location.state === null ? (
                <div className="d-flex justify-content-center col-12 py-5">
                    <div className="col-md-3 p-5 bg-white rounded-3">
                        <form onSubmit={userLogin}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control" onInput={ev => setEmail(ev.target.value)} value={email} name="email" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <span className="text-danger">{errorList.email}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" onInput={ev => setPassword(ev.target.value)} value={password} name="password" id="exampleInputPassword1" />
                                <span className="text-danger">{errorList.password}</span>
                            </div>
                            <div className="form-check">
                                <input type="checkbox" name="remember_me" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                            </div>
                            <div className="mb-3">
                                <Link to={'register'} className="form-check-label fs-6">Create account</Link>
                            </div>
                            <div className="mb-3 d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary w-75">Submit</button>
                            </div>
                            <h6 className="text-danger text-center mb-3">{invalidCred}</h6>
                            <div className="border-top pt-1">
                                <div className="text-center">
                                    <label className="text-secondary">&copy; LaravelReact</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
}

export default Login;
