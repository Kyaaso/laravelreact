import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios';
import NotFound from './NotFound';

const Update = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [userAdmin, setUserAdmin] = useState();
  const [errorList, setErrorList] = useState([]);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [token, setToken] = useState("");

  let location = useLocation();

  const userAdminCheck = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    console.log(value);
    setUserAdmin(value);
  }

  const updateAccount = async (ev) => {
    ev.preventDefault();

    const request = ({
      id: id,
      name: name,
      email: email,
      isAdmin: userAdmin,
    });
    const adminDetails = ({
      adminName: adminName,
      adminEmail: adminEmail,
    });

    document.getElementById('updateBtn').disabled = true;
    document.getElementById('updateBtn').innterText = "Updating";
    const response = await axios.patch(`http://127.0.0.1:8000/api/accounts/update/${id}`, request);
    if (response.data.status === 200) {
      
      const res = await axios.post(`http://127.0.0.1:8000/api/account-update-notify`, adminDetails);
          if(res.data.status === 200) {
            console.log(res.data.adminName);
            console.log(res.data.adminEmail);
          }
      Swal.fire(
        'Success',
        response.data.message,
        'success'
      );
    } else {
      setErrorList(response.data.validate_err);
      console.log(errorList);
    }
    document.getElementById('updateBtn').innterText = "Update";
    document.getElementById('updateBtn').disabled = false;
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsAdmin(location.state.response.isAdmin);
        setAdminName(location.state.response.name);
        setAdminEmail(location.state.response.email);
        setToken(location.state.response.token);
        const response = await axios.get(`http://127.0.0.1:8000/api/accounts/search/${id}`);
        const data = response.data.message;
        if (response.data.status === 200) {
          setName(data.name);
          setEmail(data.email);
          if (data.isAdmin === 0) {
            setUserAdmin(false);
          } else {
            setUserAdmin(true);
          }
        } else if (response.data.status === 404) {
          Swal.fire(
            'Warning',
            response.data.message,
            'warning'
          );
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      {localStorage.getItem('auth_token') === token && isAdmin? (
        <div className="container mt-2">
          <div className="d-flex justify-content-center col-12 py-5">
            <div className="col-md-5 rounded-3 bg-white">
              <form onSubmit={updateAccount} className="m-5">
                <div className="mb-3 pb-3 d-flex justify-content-center border-bottom">
                  <h6>Update a user</h6>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Fullname</label>
                  <input id="exampleInputEmail1" type="input" name="name" className="form-control" onInput={ev => setName(ev.target.value)} value={name} aria-describedby="emailHelp" />
                  <span className="text-danger">{errorList.name}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" name="email" className="form-control" id="exampleInputEmail1" onInput={ev => setEmail(ev.target.value)} value={email} aria-describedby="emailHelp" />
                  <span className="text-danger">{errorList.email}</span>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    {isAdmin ? (
                      <input className="form-check-input" type="checkbox" onChange={userAdminCheck} checked={userAdmin} id="flexCheckIndeterminate" />
                    ) : (
                      <input className="form-check-input" type="checkbox" onChange={userAdminCheck} id="flexCheckIndeterminate" />
                    )}
                    <label className="form-check-label" htmlFor="flexCheckIndeterminate">
                      Admin
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label>Are you done? <Link className="form-check-label fs-6" to={'/index'} state={{ response: location.state.response, isLogged: true }}>Here!</Link></label>
                </div>
                <div className="mb-3 d-flex justify-content-center ">
                  <button type="submit" id="updateBtn" className="btn btn-primary w-75">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default Update;
