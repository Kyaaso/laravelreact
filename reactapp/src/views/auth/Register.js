import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';

function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errorList, setErrorList] = useState([]);
    let navigate = useNavigate();

    const createAccount = (ev) => {
        ev.preventDefault();

        document.getElementById('createBtn').disabled = true;
        const request = ({
            name: name,
            email: email,
            password: password,
            password_confirmation: password_confirmation,
        });

        console.log(request);
        axios.get(`/sanctum/csrf-cookie`).then(response => {
            axios.post(`/api/create-account`, request).then(response => {
                if (response.data.status === 200) {
                    document.getElementById('createBtn').disabled = false;
                    var userData = response.data.data;
                    localStorage.setItem('auth_name', response.data.data.name);
                    localStorage.setItem('auth_token', response.data.token);
                    localStorage.setItem('auth_email', response.data.data.email);
                    Swal.fire(
                        'Success',
                        response.data.message,
                        'success'
                    );
                    navigate('/index', { state: { response: userData } });
                } else {
                    setErrorList(response.data.validate_err);
                    document.getElementById('createBtn').disabled = false;
                }
            });
        });

    }

    return (
        <div className="d-flex justify-content-center col-12 py-5">
            <div className="col-md-3 bg-white rounded-3">
                <form onSubmit={createAccount} className=" m-5">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Fullname</label>
                        <input id="exampleInputEmail1" type="input" name="name" onInput={ev => setName(ev.target.value)} value={name} className="form-control" aria-describedby="emailHelp" />
                        <span className="text-danger">{errorList.name}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name="email" onInput={ev => setEmail(ev.target.value)} value={email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <span className="text-danger">{errorList.email}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Password</label>
                        <input id="exampleInputEmail1" type="password" name="password" onInput={ev => setPassword(ev.target.value)} value={password} className="form-control" />
                        <span className="text-danger">{errorList.password}</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Repeat Password</label>
                        <input id="exampleInputEmail1" type="password" name="password_confirmation" onInput={ev => setPasswordConfirmation(ev.target.value)} value={password_confirmation} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label>Already have an account? <Link className="form-check-label fs-6" to={'/'}>Here!</Link></label>
                    </div>
                    <div className="mb-3 d-flex justify-content-center ">
                        <button type="submit" id="createBtn" className="btn btn-primary w-75">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
