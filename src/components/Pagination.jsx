
import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function PaginationIU({ currentPage, totalPages, onPageChange }) {

  const handlePrev = () => {
    // si la pagina actual es mayor que 1, se resta 1 y cambia a la pagina anterio anterior
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    //si la pagina actual es menor que el total de páginas, se agrega 1 y cambia a la siguiente pagina
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="d-flex justify-content-center mt-3">
      <Pagination>
        <Pagination.Prev disabled={currentPage === 1} onClick={handlePrev}> anterior </Pagination.Prev>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}
        <Pagination.Next disabled={currentPage === totalPages} onClick={handleNext} > siguiente </Pagination.Next>
      </Pagination>
    </div>
  );
}