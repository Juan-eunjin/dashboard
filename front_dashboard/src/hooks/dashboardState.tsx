import { useState } from "react";
import { type SearchParams } from '../api/handleSummaryApi';

export const useDashboardState = () => {
    const getTodayStr = () => new Date().toISOString().split('T')[0];

    const [searchParams, setSearchParams] = useState<SearchParams>({
        labels: '',
        startDate: getTodayStr(),
        endDate: getTodayStr()
    });

    const [chartData, setChartData] = useState({
        totalIssues: 0,
        inProgress: 0,
        open: 0,
        done: 0,
        overdue: 0
    });

    const [ganttData, setGanttData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const setDashboardData = (params: SearchParams, summary: any, daily: any) => {
        setSearchParams(params);
        sessionStorage.setItem('searchParams', JSON.stringify(params));

        setChartData({
            totalIssues: summary.totalIssues || 0,
            inProgress: summary.inProgress || 0,
            open: summary.open || 0,
            done: summary.done || 0,
            overdue: summary.overdue || 0
        });

        setGanttData(daily);
    };

    return {
        searchParams,
        chartData,
        ganttData,
        isLoading,
        setIsLoading,
        setDashboardData
    };
};
