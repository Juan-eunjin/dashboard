/**
 * 이슈 상세 페이지
 * 
 * 위에는 기간, 이슈상태 위치 > 상세페이지 정보를 출력함, block처리
 * 
 * 표 + 페이징 처리
 */

import '../styles/DetailPage.css';
import { useLocation } from 'react-router-dom';
import { FilterCheck } from '../components/FilterCheck';
import { ListButton } from '../components/ListButton';
import { DetailTable } from '../components/DetailTable';
import { useEffect, useState } from 'react';
import { PagenationComponent } from '../components/PagenationComponent';

interface NavigationState {
  date: string;
  count: number;
  from: string;
}
const DetailPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as NavigationState | null;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [issues, setIssues] = useState([]);

  //테스트 데이터 생성
  useEffect(() => {
  const mockIssues = Array.from({ length: 50 }, (_, i) => ({
    id: `ISSUE-2026-${100 + i}`,
    title: `테스트용 이슈 항목입니다. #${i + 1}`,
    projectName: "PLM 시스템 고도화", 
    assignee: "관리자",
    status: i % 3 === 0 ? "In Progress" : i % 3 === 1 ? "Done" : "Overdue",
    createdAt: state?.date || "null",
    dueDate: state?.date || "null",
  }));
  
  setIssues(mockIssues);
}, []);

  // 페이지 변경 핸들러 추가
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // TODO: 백엔드 API 연동 시 현재 페이지에 맞는 데이터 fetch 로직 필요
  };

  const handleFilterChange = (filters: any) => {
    console.log("필터 변경:", filters);
  };

  return (
    <div className="detail-container">
      {/* 3. FilterCheck에 받은 날짜를 초기값으로 전달 */}
      <FilterCheck 
        initialDate={state?.date || ''} 
        initialStatus={state?.from === 'gantt' ? '전체' : ''}
        onFilterChange={handleFilterChange}
      />
      
      <div className="content">
        {state ? (
          <p> 이슈 {state.count}건을 조회 중입니다.</p>
        ) : (
          <p>이슈 정보가 없습니다.</p>
        )}
      </div>

      <div className="table-button-container">
        <ListButton onLimitChange={(limit) => {
          setLimit(limit);
          setCurrentPage(1); // 개수 변경 시 페이지 초기화 필수!
        }} />
        </div>
        <div className="table-container">
        <DetailTable 
            issues={issues.slice((currentPage - 1) * limit, currentPage * limit)} 
            limit={limit} 
             currentPage={currentPage}
        />
       <PagenationComponent
          totalItems={issues.length} 
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DetailPage;