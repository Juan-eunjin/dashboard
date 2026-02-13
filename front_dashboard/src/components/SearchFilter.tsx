import { useForm } from '../hooks/useForm';
import { MAIN_SEARCH_LABELS } from '../constants/labels';
import '../styles/SearchFilter.css';
import { type SearchParams } from '../api/handleSummaryApi';
import { DETAIL_DEFAULT_VALUES } from '../constants/defaultValue';
import { DatePicker } from './DatePicker';
import { useLoading } from '../hooks/useLoading';
import { ProjectSelect } from './projectSelect';

interface SearchFilterProps {
  onSearch: (params: any) => Promise<void>;
  initialParams: SearchParams;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, initialParams }) => {
  const { values: params, handleChange } = useForm({
    ...initialParams,
    labels: initialParams.labels || DETAIL_DEFAULT_VALUES.PROJECT
  });

  const { isLoading, withLoading } = useLoading();

  const minEndDate = params.startDate;

  const handleSearchClick = async () => {
    await withLoading(async () => {
      await onSearch(params);
    });
  };

  return (
    <div className="search-container">
      <div className="filter-wrapper">
        <div className="filter-group">
          <label>{MAIN_SEARCH_LABELS.PROJECT}</label>
          <ProjectSelect
            filters={params}
            handleChange={handleChange}
            isLoading={isLoading}
          />
        </div>

        <div className="filter-group">
          <label>{MAIN_SEARCH_LABELS.TERM}</label>
          <DatePicker
            name="startDate"
            value={params.startDate}
            onChange={handleChange}
            disabled={isLoading}
          />
          <span>~</span>
          <DatePicker
            name="endDate"
            value={params.endDate}
            min={minEndDate}
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