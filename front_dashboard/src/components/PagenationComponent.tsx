/**
 * 페이징 처리 컴포넌트 보완본
 */
import React from 'react';
import '../styles/PagenationComponent.css';

interface PagenationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PagenationComponent: React.FC<PagenationProps> = ({
  totalItems = 0,    // 2. 기본값 설정을 통해 데이터가 없을 때의 계산 오류 방지
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
}) => {
  // 1. 전체 페이지 수 계산 (방어 코드 포함)
  const totalPages = itemsPerPage > 0 ? Math.ceil(totalItems / itemsPerPage) : 0;

  // 2. 페이지가 1개 이하이면 컴포넌트를 표시하지 않음
  if (totalPages <= 1) return null;

  // 3. 표시할 페이지 번호 배열 생성
  const pageRange = 5; // 한 번에 보여줄 페이지 번호 개수
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(pageRange / 2), totalPages - pageRange + 1));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);
  
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagenation-container">
      <ul className="pagination-list">
        {/* 처음으로 가기 */}
        <li onClick={() => onPageChange(1)} className={currentPage === 1 ? 'disabled' : ''}>«</li>
        
        {/* 이전 페이지 */}
        <li onClick={() => onPageChange(Math.max(1, currentPage - 1))} className={currentPage === 1 ? 'disabled' : ''}>‹</li>

        {/* 페이지 번호 목록 */}
        {pages.map((page) => (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </li>
        ))}

        {/* 다음 페이지 */}
        <li onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} className={currentPage === totalPages ? 'disabled' : ''}>›</li>
        
        {/* 마지막으로 가기 */}
        <li onClick={() => onPageChange(totalPages)} className={currentPage === totalPages ? 'disabled' : ''}>»</li>
      </ul>
    </div>
  );
};