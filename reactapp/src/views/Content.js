import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Content = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    var tempSearch = "";
    var id = 0;
    let navigate = useNavigate();
    let timerInterval;

    const articleClicked = (ev, urlToImage, title, description, content, author, publishedAt, url, source) => {
        ev.preventDefault();
        const article = {
            urlToImage: urlToImage,
            title: title,
            description: description,
            content: content,
            author: author,
            publishedAt: publishedAt,
            url: url,
            source: source,
            isLogged: true,
        }
        navigate('/article', { state: { response: article } });
    }

    function loadingBox() {
        Swal.fire({
            title: 'Processing!',
            html: 'The articles are now being processed.',
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        });
    }

    const categoryClicked = async (ev, category) => {
        ev.preventDefault();
        loadingBox();
        const response = await axios.get(`http://127.0.0.1:8000/api/news/category/${category}`);
        setData(response.data.articles);

    }

    const enterKeyIsPressed = async (ev, search) => {
        if (ev.code === "Enter" || ev.code === "NumpadEnter") {
            ev.preventDefault();

            loadingBox();
            if (search === "") {
                const response = await axios.get('http://127.0.0.1:8000/api/news');
                setData(response.data.articles);
            } else {
                const response = await axios.get(`http://127.0.0.1:8000/api/news/search/${search}`);
                setData(response.data.articles);
            }
        }
    };

    function onInputChanged() {
        tempSearch = document.getElementById("searchBar").value;
        setSearch(tempSearch);
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
        return () => {
        };
    }, []);


    return (

        <div className="container mt-2">
            <div className="row">
                <div className="col-12">
                    <div className="container">
                        <div className="row mb-2 mt-2 p-5 rounded bg-img shadow">
                            <div className=" height d-flex justify-content-center align-items-center p-5 mt-5 mb-5">
                                <div className="col">
                                    <div className="form shadow-lg">
                                        <i className="fa fa-search"></i>
                                        <input type="text" className="form-control form-input" name="search" id="searchBar" onKeyDown={(ev) => enterKeyIsPressed(ev, search)} onInput={onInputChanged} placeholder="Search anything..." />
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center mt-4 bg-white pt-3 rounded-top category-container shadow">
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><h6 className="me-4" role="button" name="category" onClick={(ev) => categoryClicked(ev, "business")}>Business</h6></li>
                                            <li className="list-inline-item"><h6 className="me-4" role="button" name="category" onClick={(ev) => categoryClicked(ev, "entertainment")}>Enterntainment</h6></li>
                                            <li className="list-inline-item"><h6 className="me-4" role="button" name="category" onClick={(ev) => categoryClicked(ev, "general")}>General</h6></li>
                                            <li className="list-inline-item"><h6 className="me-4" role="button" name="category" onClick={(ev) => categoryClicked(ev, "health")}>Health</h6></li>
                                        </ul>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center bg-white rounded-bottom category-container shadow">
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><h6 className="me-4" role="button" name="category" onClick={(ev) => categoryClicked(ev, "science")}>Science</h6></li>
                                            <li className="list-inline-item"><h6 className="me-4" role="button" name="category" onClick={(ev) => categoryClicked(ev, "sports")}>Sports</h6></li>
                                            <li className="list-inline-item"><h6 role="button" name="category" onClick={(ev) => categoryClicked(ev, "technology")}>Technology</h6></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-5 pb-5 bg-white">
                            {
                                data.map((item) => (
                                    <div className="col d-flex justify-content-center pt-2 border-bottom " key={id++}
                                        onClick={(ev) => articleClicked(ev,
                                            item.urlToImage,
                                            item.title,
                                            item.description,
                                            item.content,
                                            item.author,
                                            item.publishedAt,
                                            item.url,
                                            item.source.name,
                                        )}>
                                        <div className="card -0 p-1 mb-2 article-container shadow" role="button" style={{ width: '18rem' }}>
                                            <img className="card-img-top -bottom pb-1" style={{ width: '100%', height: 'auto', objectFit: 'contain', objectPosition: '100% 0' }} src={item.urlToImage} alt="" />
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
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
