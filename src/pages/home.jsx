import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/row-table";
import { RowTable } from "../components/row-table";
import { useDispatch, useSelector } from "react-redux";
import { CommonConstant } from "../constant/common-constant";
import { Pagination } from "../components/pagination";
import { checkGetData } from "../store/country";
import { ReducerConstant } from "../constant/reducer-constant";

function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.countries);
  const loading = useSelector((state) => state.loading);

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  useEffect(() => {
    checkGetData(data, dispatch);

    dispatch({
      type: ReducerConstant.LOADING,
      loading: false,
    });

    setSortedData(data);
  }, [data, dispatch]);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sorted = [...data].sort((a, b) => {
      if (key === "name.common") {
        a[key] = a.name.common.toLowerCase();
        b[key] = b.name.common.toLowerCase();
      }
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sorted);

    dispatch({
      type: ReducerConstant.INIT,
      countries: sorted,
    });
  };

  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(CommonConstant.PAGINATION);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "↑" : "↓";
    }
    return "";
  };

  return (
    <div className="container-sm mt-5">
      <h1 className="text-center mb-4">Country Data</h1>

      {/* Table Section with Responsive Wrapper */}
      <div className="overflow-x-auto shadow-sm rounded">
        <table className="table table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th scope="col">Flag</th>
              <th scope="col" onClick={() => sortData("name.common")}>
                Name {getSortIcon("name.common")}
              </th>
              <th scope="col" onClick={() => sortData("population")}>
                Population {getSortIcon("population")}
              </th>
              <th scope="col" onClick={() => sortData("area")}>
                Area (KM²) {getSortIcon("area")}
              </th>
              <th scope="col" onClick={() => sortData("region")}>
                Region {getSortIcon("region")}
              </th>
              <th scope="col">Maps</th>
            </tr>
          </thead>
          <tbody className="text-center align-middle">
            {loading ? (
              <tr>
                <td colSpan="6">
                  <div className="d-flex justify-content-center py-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              <RowTable data={currentItems} />
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
      <div className="d-flex justify-content-center mt-4">
        {loading ? (
          <div className="d-flex justify-content-center py-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
          />
        )}
      </div>
    </div>
  );
}

export default Home;