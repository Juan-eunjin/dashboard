/**
 * handleSearchApi와 handleSummaryApi를 병렬로 실행하는 fetchDashboardData 함수를 구현
 */

import { handleSearchApi } from "./handleSearchApi";
import { handleSummaryApi, type SearchParams } from "./handleSummaryApi";
import { ERROR_MESSAGES } from '../constants/messages';

export const fetchDashboardData = async (params: SearchParams) => {
    try {
        const [searchData, summaryData] = await Promise.all([
            handleSearchApi(params),
            handleSummaryApi(params)
        ]);
        return { searchData, summaryData };
    } catch (error) {
        console.error(ERROR_MESSAGES.SEARCH_FAIL, error);
        throw error;
    }
};