import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Article = () => {
    const location = useLocation();
    const article = location.state;

    useEffect(() => {
        const fetchArticle = async () => {
        };
        fetchArticle();
        return () => {
        };
    }, []);
    return (
        <div className="container mt-2 py-5">
            <div className="row">
                <div className="col-12">
                    <div className="container">
                        <div className="row mb-2">
                            <div className="col-12 d-flex justify-content-center align-items-center ps-5 mt-5 pb-4 border-bottom">
                                <h1 className="display-4 fw-bold">{article.response.title}</h1>
                            </div>
                            <div className="col-12 text-center ps-5 pt-3 border-bottom">
                                <ul className="list-inline d-flex justify-content-between">
                                    <li className="list-inline-item"><h6 className="display-6 fs-3">Source: {article.response.source}</h6></li>
                                    <li className="list-inline-item"><h6 className="display-6 fs-3">{article.response.author ? ("Author: ") : (" ")}{article.response.author}</h6></li>
                                    <li className="list-inline-item"><h6 className="display-6 fs-3">Published at: {article.response.publishedAt}</h6></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row mb-2 p-3 d-flex justify-content-center">
                            <div className="row">
                                <div className="col-12 d-flex justify-content-center">
                                    <img className="" style={{ width: '55%', height: 'auto', objectFit: 'contain', objectPosition: '100% 0' }} src={article.response.urlToImage} alt="" />
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-7 mt-3">
                                    <p className="display-6 fs-2 text-justify"><small>{article.response.description}</small></p>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-7  mt-3">
                                    <p className="display-6 fs-2 text-justify"><small>{article.response.content}</small></p>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center">
                                <div className="col-7 mt-3">
                                    <p className="display-6 fs-5 text-justify"><small>Source Link: {article.response.url}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Article;
