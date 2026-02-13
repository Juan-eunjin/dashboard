import client from './apiClient';
import { ERROR_MESSAGES } from '../constants/messages';


export interface SearchAllParams {
    labels: string;
    startDate: string;
    endDate: string;
    status?: string;
    page?: number;
    limit?: number;
}

export const handleSearchApi = async (params: SearchAllParams) => {
    try {
        const response = await client.get('/search', {
            params: {
                label: params.labels,
                startDate: params.startDate,
                endDate: params.endDate,
                status: params.status,
                page: params.page,
                limit: params.limit
            }
        });
        return response.data;
    } catch (error) {
        console.error(ERROR_MESSAGES.PROJECT_LOAD_FAIL, error);
        throw error;
    }
};

export const fetchProjectList = async () => {
    try {
        const response = await client.get('/projectslist');
        return response.data;
    } catch (error) {
        console.error(ERROR_MESSAGES.PROJECT_LOAD_FAIL, error);
        throw error;
    }
};
