import React, { useEffect, useState } from 'react';
import { fetchProjectList } from '../api/handleSearchApi';
import { useForm } from '../hooks/useForm';
import { MAIN_SEARCH_LABELS } from '../constants/labels';
import '../styles/SearchFilter.css';
import { ERROR_MESSAGES } from '../constants/messages';
import { type SearchParams } from '../api/handleSummaryApi';
import { DETAIL_DEFAULT_VALUES } from '../constants/defaultValue';

interface SearchFilterProps {
  onSearch: (params: any) => Promise<void>;
  initialParams: SearchParams;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, initialParams }) => {
  const { values: params, handleChange } = useForm({
    ...initialParams,
    labels: initialParams.labels || DETAIL_DEFAULT_VALUES.PROJECT
  });

  const [projectList, setProjectList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const today = new Date().toISOString().split('T')[0];
  const minEndDate = params.startDate;

  useEffect(() => {
    const loadSelectOptions = async () => {
      try {
        const data = await fetchProjectList();
        if (data && Array.isArray(data)) {
          setProjectList(data);
        }
      } catch (error) {
        console.error(ERROR_MESSAGES.PROJECT_LOAD_FAIL, error);
      }
    };

    loadSelectOptions();
  }, []);

  const handleSearchClick = async () => {
    setIsLoading(true);
    try {
      await onSearch(params);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="filter-wrapper">
        <div className="filter-group">
          <label>{MAIN_SEARCH_LABELS.PROJECT}</label>
          <select
            name="labels"
            value={params.labels}
            onChange={handleChange}
            disabled={isLoading}
          >
            {projectList.map((proj) => (
              <option key={proj} value={proj}>{proj}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>{MAIN_SEARCH_LABELS.TERM}</label>
          <input
            type="date"
            name="startDate"
            value={params.startDate}
            onChange={handleChange}
            max={today}
            disabled={isLoading}
          />
          <span>~</span>
          <input
            type="date"
            name="endDate"
            value={params.endDate}
            min={minEndDate}
            max={today}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

      </div>

      <button
        className={`search-button ${isLoading ? 'blocked' : ''}`}
        onClick={handleSearchClick}
        disabled={isLoading}
      >
        {isLoading ? MAIN_SEARCH_LABELS.BUTTON_LOADING : MAIN_SEARCH_LABELS.BUTTON}
      </button>
    </div>
  );
};