import '../styles/DetailPage.css';
import { useLocation } from 'react-router-dom';
import { DetailPageSearch } from '../components/detailPageSearch';
import { ListButton } from '../components/ListButton';
import { DetailTable } from '../components/DetailTable';
import { useEffect, useState, useCallback } from 'react';
import { PagenationComponent } from '../components/PagenationComponent';
import { handleSearchApi, type SearchAllParams } from '../api/handleSearchApi';
import { DETAIL_DEFAULT_VALUES } from '../constants/defaultValue';
import { DETAIL_FILTER_OPTION, DETAIL_RESULT_LABELS, NAV_SOURCE } from '../constants/labels';
import { useForm } from '../hooks/useForm';

interface NavigationState {
  labels: string;
  date: string;
  count: number;
  from: string;
  status?: string;
}

const DetailPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as NavigationState | null;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [issues, setIssues] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);


  const { values: filters, setValues: setFilters } = useForm({
    labels: state?.labels || DETAIL_DEFAULT_VALUES.PROJECT,
    status: state?.status || (state?.from === NAV_SOURCE.GANTT ? DETAIL_FILTER_OPTION.ALL : DETAIL_DEFAULT_VALUES.STATUS),
    startDate: state?.date || '',
    endDate: state?.date || ''
  });

  const fetchIssues = useCallback(async (filters: any) => {
    if (!filters.startDate || !filters.endDate) return;
    setLoading(true);
    try {
      const apiParams: SearchAllParams = {
        labels: filters.labels,
        startDate: filters.startDate,
        endDate: filters.endDate,
        status: filters.status,
        page: currentPage,
        limit: limit
      };

      const response = await handleSearchApi(apiParams);

      if (Array.isArray(response)) {
        setIssues(response);
        setTotalCount(response.length);
      } else {
        setIssues(response.issues || []);
        setTotalCount(response.totalCount || 0);
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, limit]);

  useEffect(() => {
    fetchIssues(filters);
  }, [fetchIssues, filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="detail-container">
      <DetailPageSearch
        initialLabels={filters.labels}
        initialDate={filters.startDate}
        initialStatus={filters.status}
        onFilterChange={handleFilterChange}
      />

      <div className="content">
        {loading ? (
          <p>{DETAIL_RESULT_LABELS.LODING_DATA}</p>
        ) : (
          <p>
            <strong>{totalCount}</strong>
            {DETAIL_RESULT_LABELS.RESULT_ISSUES}
          </p>
        )}
      </div>

      <div className="table-button-container">
        <ListButton onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setCurrentPage(1);
        }} />
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