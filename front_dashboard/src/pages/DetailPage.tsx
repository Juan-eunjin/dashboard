import '../styles/DetailPage.css';
import { DetailPageSearch } from '../components/detailPageSearch';
import { ListButton } from '../components/ListButton';
import { DetailTable } from '../components/DetailTable';
import { PagenationComponent } from '../components/PagenationComponent';
import { DETAIL_RESULT_LABELS } from '../constants/labels';
import { useDetailState } from '../hooks/useDetailState';

/**
 * 상세 페이지 컴포넌트
 * 이슈 목록을 조회하고 필터링 및 페이징 기능을 제공합니다.
 */
const DetailPage: React.FC = () => {
  // 데이터 및 UI 상태 관리 (전체 로직을 커스텀 훅으로 이동)
  const {
    filters,
    currentPage,
    limit,
    issues,
    totalCount,
    isLoading,
    handleFilterChange,
    handlePageChange,
    handleLimitChange
  } = useDetailState();

  return (
    <div className="detail-container">
      <DetailPageSearch
        initialLabels={filters.labels}
        initialDate={filters.startDate}
        initialStatus={filters.status}
        onFilterChange={handleFilterChange}
      />

      <div className="content">
        {isLoading ? (
          <p>{DETAIL_RESULT_LABELS.LODING_DATA}</p>
        ) : (
          <p>
            <strong>{totalCount}</strong>
            {DETAIL_RESULT_LABELS.RESULT_ISSUES}
          </p>
        )}
      </div>

      <div className="table-button-container">
        <ListButton onLimitChange={handleLimitChange} />
      </div>

      <div className="table-container">
        <DetailTable
          issues={issues}
          limit={limit}
          currentPage={currentPage}
        />
        <PagenationComponent
          totalItems={totalCount}
          itemsPerPage={limit}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DetailPage;