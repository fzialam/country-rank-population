import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticles } from "../store/articles";
import { ReducerConstant } from "../constant/reducer-constant";

const Articles = () => {
  const [loading, setLoading] = useState(true);
  const articles = useSelector((state) => state.articles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles());
    setLoading(false);
  }, [loading, dispatch]);


  if (loading) {
    return (
      <div className="d-flex justify-content-center py-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4 fw-bolder">Articles</h1>
      {loading ? (
        <div className="d-flex justify-content-center py-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
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
      )}
    </div>
  );
};

export default Articles;
