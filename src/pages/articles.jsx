import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your own API key from New York Times API
    const apiKey = "mNmYZYQNvFbPCKQ4eJESLELPu8Ve7PZo";
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Peace&api-key=${apiKey}`;

    axios
      .get(url)
      .then((response) => {
        setArticles(response.data.response.docs.slice(0, 12)); // Limit to 12 articles
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Articles</h2>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div>
          {/* Top Section with 3 cards */}
          <div className="row mb-4">
            {articles.slice(0, 3).map((article, index) => (
              <div className="col-sm-6 col-md-4 mb-4" key={index}>
                <div className="card">
                  {article.multimedia && article.multimedia[0] ? (
                    <img
                      src={`https://static01.nyt.com/${article.multimedia[0].url}`}
                      className="card-img-top"
                      alt={article.headline.main}
                    />
                  ) : (
                    <div
                      className="card-img-top"
                      style={{ height: "150px", backgroundColor: "#f0f0f0" }}
                    ></div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{article.headline.main}</h5>
                    <p
                      className="card-text text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {article.abstract}
                    </p>
                    <a
                      href={article.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left Section with 4 cards */}
          <div className="row">
            <div className="col-sm-6 col-md-3">
              {articles.slice(3, 7).map((article, index) => (
                <div className="card mb-4" key={index}>
                  {article.multimedia && article.multimedia[0] ? (
                    <img
                      src={`https://static01.nyt.com/${article.multimedia[0].url}`}
                      className="card-img-top"
                      alt={article.headline.main}
                    />
                  ) : (
                    <div
                      className="card-img-top"
                      style={{ height: "150px", backgroundColor: "#f0f0f0" }}
                    ></div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{article.headline.main}</h5>
                    <p
                      className="card-text text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {article.abstract}
                    </p>
                    <a
                      href={article.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Section with 5 cards */}
            <div className="col-sm-6 col-md-9">
              {articles.slice(7, 12).map((article, index) => (
                <div className="card mb-4" key={index}>
                  {article.multimedia && article.multimedia[0] ? (
                    <img
                      src={`https://static01.nyt.com/${article.multimedia[0].url}`}
                      className="card-img-top"
                      alt={article.headline.main}
                    />
                  ) : (
                    <div
                      className="card-img-top"
                      style={{ height: "150px", backgroundColor: "#f0f0f0" }}
                    ></div>
                  )}
                  <div className="card-body">
                    <h5 className="card-title">{article.headline.main}</h5>
                    <p
                      className="card-text text-truncate"
                      style={{ maxWidth: "100%" }}
                    >
                      {article.abstract}
                    </p>
                    <a
                      href={article.web_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsComponent;
