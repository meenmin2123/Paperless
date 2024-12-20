// Pagination.js
import React from 'react';
import styles from '../../styles/component/Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange, showComposeButton, handleCompose,className }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${styles.pagenaition} ${className}`}>
      <button
        className={styles['page-button']}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`${styles['page-button']} ${currentPage === number ? styles.active : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        className={styles['page-button']}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>

      {/* showComposeButton이 true일 때만 "메일 작성" 버튼 표시 */}
      {showComposeButton && (
        <button className={styles['compose-button']} onClick={handleCompose}>
          메일 작성
        </button>
      )}
    </div>
  );
}

export default Pagination;
