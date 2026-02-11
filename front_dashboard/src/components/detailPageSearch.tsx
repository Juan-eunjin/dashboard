import '../styles/FilterCheck.css';
import React, { useEffect, useState } from 'react';
import { fetchProjectList } from '../api/handleSearchApi';
import { DETAIL_FILTER_LABELS, DETAIL_FILTER_OPTION } from '../constants/labels';
import { ERROR_MESSAGES } from '../constants/messages';
import { useForm } from '../hooks/useForm';
import { BACKEND_DEFAULT_VALUES, DETAIL_DEFAULT_VALUES } from '../constants/defaultValue';

interface DetailPageSearchProps {
    initialStatus?: string;
    initialDate?: string;
    initialLabels?: string;
    onFilterChange: (filters: { status: string; startDate: string; endDate: string; labels: string }) => void;
}

export const DetailPageSearch: React.FC<DetailPageSearchProps> = ({
    initialStatus = DETAIL_DEFAULT_VALUES.STATUS,
    initialDate = '',
    initialLabels = '',
    onFilterChange
}) => {

    const { values: filters, handleChange } = useForm({
        status: initialStatus,
        startDate: initialDate,
        endDate: initialDate,
        labels: initialLabels
    });

    const [projectList, setProjectList] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await fetchProjectList();
                if (data && Array.isArray(data)) setProjectList(data);
            } catch (error) {
                console.error(ERROR_MESSAGES.PROJECT_LOAD_FAIL, error);
            }
        };
        getProjects();
    }, []);

    const handleSearchClick = async () => {
        setIsLoading(true);
        try {
            await onFilterChange(filters);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="check-container">
            <div className="filter-group">
                <label>
                    {DETAIL_FILTER_LABELS.PROJECT}
                </label>
                <select
                    name="labels"
                    value={filters.labels}
                    onChange={handleChange}
                    disabled={isLoading}
                >
                    {projectList.map((proj) => (
                        <option
                            key={proj}
                            value={proj}>{proj}</option>
                    ))}
                </select>
            </div>
            <div className="date-group">
                <label>
                    {DETAIL_FILTER_LABELS.TERM}
                </label>
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    max={today}
                    onChange={handleChange}
                    disabled={isLoading}
                />
                <span> ~ </span>
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    min={filters.startDate}
                    max={today}
                    onChange={handleChange}
                    disabled={isLoading}
                />
            </div>
            <div className="status-group">
                <label>
                    {DETAIL_FILTER_LABELS.STATUS}
                </label>
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleChange}
                    disabled={isLoading}
                >
                    <option value={BACKEND_DEFAULT_VALUES.ALL}>
                        {DETAIL_FILTER_OPTION.ALL}
                    </option>
                    <option value={BACKEND_DEFAULT_VALUES.OPEN}>
                        {DETAIL_FILTER_OPTION.OPEN}
                    </option>
                    <option value={BACKEND_DEFAULT_VALUES.IN_PROGRESS}>
                        {DETAIL_FILTER_OPTION.IN_PROGRESS}
                    </option>
                    <option value={BACKEND_DEFAULT_VALUES.DONE}>
                        {DETAIL_FILTER_OPTION.DONE}
                    </option>
                </select>
            </div>

            <button
                className={`search-button ${isLoading ? 'blocked' : ''}`}
                onClick={handleSearchClick}
                disabled={isLoading}
            >
                {isLoading ? DETAIL_FILTER_LABELS.BUTTON_LOADING : DETAIL_FILTER_LABELS.BUTTON}
            </button>
        </div>
    );
};