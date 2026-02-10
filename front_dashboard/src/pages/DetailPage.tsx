import '../styles/DetailPage.css';
import { useLocation } from 'react-router-dom';
import { FilterCheck } from '../components/FilterCheck';
import { ListButton } from '../components/ListButton';
import { DetailTable } from '../components/DetailTable';
import { useEffect, useState } from 'react';
import { PagenationComponent } from '../components/PagenationComponent';
import axios from 'axios'; // axios 추가

interface NavigationState {
  date: string;
  count: number;
  from: string; // 'pie' 또는 'gantt'
  status?: string; // 대시보드에서 넘어온 클릭된 상태값
}

const DetailPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as NavigationState | null;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10); // 기본 10개
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. 데이터 가져오는 함수: 파라미터에 limit과 page 추가
  const fetchIssues = async (filters: any) => {
    setLoading(true);
    const currentProject = filters.labels || state?.project || ''; 
    const currentDate = filters.date || state?.date;

    try {
      const response = await axios.get('/api/issues-list', {
        params: {
          labels: currentProject,
          startDate: currentDate,
          endDate: currentDate,
          status: filters.status || state?.status,
          // 백엔드 컨트롤러의 @RequestParam 이름과 맞춰줍니다.
          page: currentPage, 
          limit: limit 
        }
      });
      setIssues(response.data);
    } catch (error) {
      console.error("상세 리스트 조회 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. 의존성 배열을 활용해 상태가 바뀔 때마다 자동 호출 (중복 useEffect 삭제)
  useEffect(() => {
    if (state) {
      fetchIssues({ date: state.date, status: state.status });
    }
  }, [state, currentPage, limit]); // 페이지 번호나 보기 개수가 바뀌면 재호출

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filters: any) => {
    setCurrentPage(1); // 필터 변경 시 1페이지로 초기화
    fetchIssues(filters);
  };

  return (
    <div className="detail-container">
      <FilterCheck 
        initialDate={state?.date || ''} 
        initialStatus={state?.status || (state?.from === 'gantt' ? '전체' : '')}
        onFilterChange={handleFilterChange}
      />
      
      <div className="content">
        {loading ? (
          <p>데이터를 불러오는 중입니다...</p>
        ) : (
          /* 전체 데이터 개수는 별도의 Count API가 없다면 현재 리스트의 길이로 표시 */
          <p>총 <strong>{state?.count || issues.length}</strong>건의 이슈가 조회되었습니다.</p>
        )}
      </div>

      <div className="table-button-container">
        {/* '20개씩 보기'를 누르면 limit이 바뀌며 useEffect가 실행됩니다. */}
        <ListButton onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setCurrentPage(1);
        }} />
      </div>

      <div className="table-container">
        <DetailTable 
          issues={issues} // 서버에서 페이징된 데이터를 주므로 slice 불필요
          limit={limit} 
          currentPage={currentPage}
        />
        <PagenationComponent
          /* 주의: 전체 개수를 알기 위해서는 백엔드에서 Total Count를 같이 보내줘야 정확합니다. */
          totalItems={state?.count || issues.length} 
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DetailPage;