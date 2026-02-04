/**
 * 검색 기능 컨포넌트
 * 
 * [저장 값 확인 구조]
 * const selectedValue = e.target.value;
    setProject(selectedValue);
    console.log("선택된 프로젝트:", selectedValue); // 입력한 즉시 확인!
 */

import React, { useState } from 'react';
import '../styles/SearchFilter.css';

interface SearchFilterProps {
  onSearch: (params: any) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
    const [project, setProject] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

return (
    <div className="search-container">
      <div className="filter-group">
        <label>프로젝트 명</label>
        <select 
          value={project} 
          onChange={(e) => setProject(e.target.value)}>
          <option value="">전체</option>
          <option value="projectA">프로젝트 A</option>
        </select>
      </div>

      <div className="filter-group">
        <label>기간</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <span>~</span>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>

      <button className="search-button" onClick={() => onSearch({ project, startDate, endDate })}>
        조회
      </button>

    </div>
  );
};
