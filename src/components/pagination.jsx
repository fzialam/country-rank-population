export const Pagination = ({ currentPage, totalPages, paginate }) => {
  const nextPage = () => paginate(currentPage + 1);
  const prevPage = () => paginate(currentPage - 1);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Jumlah halaman yang ditampilkan di layar kecil
    const half = Math.floor(maxPagesToShow / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (start === 1) {
      end = Math.min(totalPages, maxPagesToShow);
    } else if (end === totalPages) {
      start = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              paginate(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }

    // Tambahkan "..." jika ada halaman di luar rentang
    if (start > 1) {
      pageNumbers.unshift(
        <li key="start-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
      pageNumbers.unshift(
        <li key={1} className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              paginate(1);
            }}
          >
            1
          </a>
        </li>
      );
    }

    if (end < totalPages) {
      pageNumbers.push(
        <li key="end-ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      );
      pageNumbers.push(
        <li key={totalPages} className="page-item">
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              paginate(totalPages);
            }}
          >
            {totalPages}
          </a>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav aria-label="Page navigation example" className="mt-3">
      <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
        <ul className="pagination justify-content-center">
          {/* Previous Button */}
          {currentPage === 1 ? (
            <li className="page-item disabled">
              <a className="page-link" href="#" aria-disabled="true">
                Previous
              </a>
            </li>
          ) : (
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  prevPage();
                }}
              >
                Previous
              </a>
            </li>
          )}

          {/* Page Numbers */}
          {renderPageNumbers()}

          {/* Next Button */}
          {currentPage === totalPages ? (
            <li className="page-item disabled">
              <a className="page-link" href="#" aria-disabled="true">
                Next
              </a>
            </li>
          ) : (
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  nextPage();
                }}
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
