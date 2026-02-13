import { useState, useCallback, useEffect } from 'react';
import { handleSearchApi, type SearchAllParams } from '../api/handleSearchApi';
import { useLoading } from './useLoading';
import { useForm } from './useForm';
import { DETAIL_DEFAULT_VALUES } from '../constants/defaultValue';
import { DETAIL_FILTER_OPTION, NAV_SOURCE } from '../constants/labels';
import { useLocation } from 'react-router-dom';

interface NavigationState {
    labels: string;
    date: string;
    count: number;
    from: string;
    status?: string;
}

export const useDetailState = () => {
    const location = useLocation();
    const state = location.state as NavigationState | null;

    // 1. 필터 폼 관리
    const { values: filters, setValues: setFilters } = useForm({
        labels: state?.labels || DETAIL_DEFAULT_VALUES.PROJECT,
        status: state?.status || (state?.from === NAV_SOURCE.GANTT ? DETAIL_FILTER_OPTION.ALL : DETAIL_DEFAULT_VALUES.STATUS),
        startDate: state?.date || '',
        endDate: state?.date || ''
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [issues, setIssues] = useState<any[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);

    // useLoading 훅 사용
    const { isLoading, withLoading } = useLoading();

    const fetchIssues = useCallback(async (currentFilters: any) => {
        if (!currentFilters.startDate || !currentFilters.endDate) return;

        await withLoading(async () => {
            const apiParams: SearchAllParams = {
                labels: currentFilters.labels,
                startDate: currentFilters.startDate,
                endDate: currentFilters.endDate,
                status: currentFilters.status,
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
        });
    }, [currentPage, limit, withLoading]);

    // 필터 변경 핸들러
    const handleFilterChange = useCallback((newFilters: any) => {
        setFilters(newFilters);
        setCurrentPage(1); // 필터 변경 시 첫 페이지로 초기화
    }, [setFilters]);

    // 페이지 변경 핸들러
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    // 리밋 변경 핸들러
    const handleLimitChange = useCallback((newLimit: number) => {
        setLimit(newLimit);
        setCurrentPage(1);
    }, []);

    // 데이터 조회 (필터, 페이지, limit 변경 시 실행)
    useEffect(() => {
        fetchIssues(filters);
    }, [fetchIssues, filters]);

    return {
        filters,
        currentPage,
        limit,
        issues,
        totalCount,
        isLoading,
        handleFilterChange,
        handlePageChange,
        handleLimitChange
    };
};
