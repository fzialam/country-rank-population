export const Pagination = ({ currentPage, totalPages, paginate }) => {
    const nextPage = () => paginate(currentPage + 1);
    const prevPage = () => paginate(currentPage - 1);

    return (
        <nav aria-label="Page navigation example">
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
                {[...Array(totalPages)].map((_, index) => (
                    <li
                        key={index + 1}
                        className={`page-item ${currentPage === index + 1 ? "active" : ""
                            }`}
                    >
                        <a
                            className="page-link"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                paginate(index + 1);
                            }}
                        >
                            {index + 1}
                        </a>
                    </li>
                ))}

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
        </nav>
    );
};
