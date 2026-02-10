import React, { useEffect, useState } from 'react';
import '../styles/SearchFilter.css';
import axios from 'axios';

interface SearchFilterProps {
  onSearch: (params: any) => Promise<void>;
  initialParams: { project: string; startDate: string; endDate: string };
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, initialParams }) => {
  // 1. 개별 상태(project, startDate 등) 대신 params 하나로 통합 관리합니다.
  const [params, setParams] = useState(initialParams);
  const [projectList, setProjectList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 2. 부모(MaindashBoard)의 데이터가 복구되어 내려오면 params를 즉시 업데이트합니다.
  useEffect(() => {
    if (initialParams) {
      setParams(initialParams);
    }
  }, [initialParams]);

  // 공통 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  // 프로젝트 목록 불러오기
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        if (response.data && Array.isArray(response.data)) {
          setProjectList(response.data);
          
          // 초기 진입 시 세션에 저장된 프로젝트가 없다면 첫 번째 프로젝트로 설정
          if (response.data.length > 0 && !initialParams.project) {
             setParams(prev => ({ ...prev, project: response.data[0] }));
          }
        }
      } catch (error) {
        console.error("프로젝트 목록 로드 실패", error);
      }
    };
    fetchProjects();
  }, [initialParams.project]);

  // 날짜 제한 로직
  const minEndDate = params.startDate;
  const getMaxEndDate = (start: string) => {
    const date = new Date(start);
    date.setDate(date.getDate() + 31);
    return date.toISOString().split('T')[0];
  };
  const maxEndDate = getMaxEndDate(params.startDate);

  const handleSearchClick = async () => {
    setIsLoading(true);
    try {
      await onSearch(params); // 통합된 params 전달
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      {/* 🚩 1. 프로젝트와 기간 그룹을 묶어주는 wrapper를 추가합니다. */}
      {/* 이 div가 있어야 CSS의 gap: 50px가 적용됩니다. */}
      <div className="filter-wrapper">
        
        {/* 프로젝트 그룹 */}
        <div className="filter-group">
          <label>프로젝트 명</label>
          <select 
            name="project" 
            value={params.project} 
            onChange={handleChange}
            disabled={isLoading}
          >
            {projectList.map((proj) => (
              <option key={proj} value={proj}>{proj}</option>
            ))}
          </select>
        </div>

        {/* 기간 그룹 */}
        <div className="filter-group">
          <label>기간</label>
          <input 
            type="date" 
            name="startDate" 
            value={params.startDate} 
            onChange={handleChange} 
            disabled={isLoading}
          />
          <span>~</span>
          <input 
            type="date" 
            name="endDate" 
            value={params.endDate} 
            min={minEndDate}
            max={maxEndDate}
            onChange={handleChange} 
            disabled={isLoading}
          />
        </div>
        
      </div> {/* 🚩 filter-wrapper 끝 */}

      {/* 🚩 2. 버튼은 wrapper 밖에 있어야 margin-left: auto가 작동하여 오른쪽 끝으로 붙습니다. */}
      <button 
        className={`search-button ${isLoading ? 'blocked' : ''}`} 
        onClick={handleSearchClick}
        disabled={isLoading}
      >
        {isLoading ? '조회 중...' : '조회'}
      </button>
    </div>
  );
};