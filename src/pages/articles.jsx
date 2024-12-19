import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/articles";

const NewsComponent = () => {
    const loading = useSelector((state) => state.loading);
    const articles = useSelector((state) => state.articles);
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchArticles());
      dispatch({
        type: ReducerConstant.LOADING,
        loading: false,
      });
    }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div class="row">
      <h1 className="fw-bolder my-4">Articles</h1>
      {articles.slice(0, 12).map((article, index) => (
        <div className="col-12 mb-3" key={index}>
          <div className="card article-card shadow-sm">
            <div className="card-body d-flex align-items-center">
              {/* Gambar Artikel */}
              {article.multimedia && article.multimedia[0] ? (
                <img
                  src={`https://static01.nyt.com/${article.multimedia[0].url}`}
                  alt={article.headline.main}
                  className="article-image"
                />
              ) : (
                <div className="placeholder-image"></div>
              )}

              {/* Konten Artikel */}
              <div className="article-content">
                <h5 className="article-title">{article.headline.main}</h5>
                <p className="article-description">
                  {article.abstract || "No description available."}
                </p>
                <a
                  href={article.web_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-read-more"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsComponent;
