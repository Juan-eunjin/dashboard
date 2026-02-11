import client from './apiClient';

export interface SearchParams {
    labels: string;
    startDate: string;
    endDate: string;
}

export const fetchSummary = (params: SearchParams) =>
    client.get('/summary', {
        params: {
            labels: params.labels,
            startDate: params.startDate,
            endDate: params.endDate
        }
    });

export const fetchDailyIssues = (params: SearchParams) =>
    client.get('/daily-issues', {
        params: {
            labels: params.labels,
            startDate: params.startDate,
            endDate: params.endDate
        }
    });

export const handleSummaryApi = async (params: SearchParams) => {
    const [summaryRes, dailyRes] = await Promise.all([
        fetchSummary(params),
        fetchDailyIssues(params)
    ]);

    return {
        summary: summaryRes.data,
        daily: dailyRes.data.map((item: any) => ({
            date: item.issueDate,
            count: item.totalIssues
        }))
    };
};
