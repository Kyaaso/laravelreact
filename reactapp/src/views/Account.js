import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';

const Account = (props) => {
    const [data, setData] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    let navigate = useNavigate();
    var id = 1;

    const deleteAccount = async (ev, id) => {
        ev.preventDefault();

        const clicked = ev.currentTarget;

        const response = await axios.post(`http://127.0.0.1:8000/api/accounts/delete/${id}`);
        if (response.data.status === 200) {
            Swal.fire(
                'Success',
                response.data.message,
                'success'
            );
        }
        clicked.closest("tr").remove();
    }

    const updateAccount = async (ev, id) => {
        ev.preventDefault();
        setIsAdmin(false);
        setIsLogged(false);

        navigate(`/update-account/${id}`, { state: { response: props.userData } });
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                if (localStorage.getItem('auth_token')) {
                    setIsLogged(true);
                    setIsAdmin(props.userData.isAdmin);
                    const response = await axios.get('http://127.0.0.1:8000/api/accounts');
                    setData(response.data);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchUsers();
    }, []);
    return (
        <div>
            {isLogged && isAdmin ? (
                <div className="container mt-2 bg-white">
                    <div className="d-flex justify-content-center col-12 py-5">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">isAdmin</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <th scope="row">{id++}</th>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.isAdmin}</td>
                                        <td><button type="button" onClick={(ev) => updateAccount(ev, item.id)} className="btn btn-warning btn-sm">Update</button></td>
                                        <td><button type="button" onClick={(ev) => deleteAccount(ev, item.id)} className="btn btn-danger btn-sm">Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>You are not allowed</p>
            )

            }

        </div>

    );
}

export default Account;
