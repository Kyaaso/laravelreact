import { useEffect, useState } from 'react';
import axios from 'axios';

const Content = () => {
    const [data, setData] = useState([]);
    const [isPressed, setIspressed] = useState(false);
    var id = 0;

    const enterKeyPressed = (event) => {
        if (event.key === 'Enter') {
          isPressed(true);
        }
      }

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/news');
                setData(response.data.articles);
            } catch (e) {
                console.log(e);
            }
        };
        fetchNews();
    }, []);
    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-12">
                    <div className="container">
                        <div className="row mb-2 mt-2 bg-white p-5 rounded">
                            <div className=" height d-flex justify-content-center align-items-center p-5 mt-5 mb-4">
                                <div className="col">
                                    <div className="form">
                                        <i className="fa fa-search"></i>
                                        <input type="text" className="form-control form-input" onKeyDown={enterKeyPressed} placeholder="Search anything..." />
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center mt-4">
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><h6 className="me-4">Business</h6></li>
                                            <li className="list-inline-item"><h6 className="me-4">Enterntainment</h6></li>
                                            <li className="list-inline-item"><h6 className="me-4">General</h6></li>
                                            <li className="list-inline-item"><h6 className="me-4">Health</h6></li>
                                        </ul>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center">
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><h6 className="me-4">Science</h6></li>
                                            <li className="list-inline-item"><h6 className="me-4">Sports</h6></li>
                                            <li className="list-inline-item"><h6 className="">Technology</h6></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5 pb-5 bg-white">
                            THIS IS THE CONTENT AREA
                            {/* {
                                data.map((item) => (
                                    <div className="col d-flex justify-content-center pt-2 border-bottom" key={id++}>
                                        <div className="card -0 p-1 mb-2" style={{ width: '18rem' }}>
                                            <img className="card-img-top -bottom pb-1" style={{ width: '100%', height: 'auto', objectFit: 'contain', objectPosition: '100% 0' }} src={item.urlToImage} alt="Card image cap" />
                                            <div className="card-body">
                                                <h5 className="card-title"><u>{item.title}</u></h5>
                                                <p className="card-text">{item.description}</p>
                                                <h6 className="card-subtitle">{item.author}</h6>
                                                <br />
                                                <h6 className="card-subtitle text-muted fst-italic">{item.publishedAt}</h6>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
