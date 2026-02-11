import '../styles/MaindashBoard.css';
import { SearchFilter } from '../components/SearchFilter';
import { Piechart } from '../components/Piechart';
import { GantChart } from '../components/GantChart';
import { ERROR_MESSAGES } from '../constants/messages';
import { DETAIL_LABELS } from '../constants/labels';
import { handleSummaryApi, type SearchParams } from '../api/handleSummaryApi';
import { useDashboardState } from '../hooks/dashboardState';
import { handleSearchApi } from '../api/handleSearchApi';

const MaindashBoard = () => {

    const {
        searchParams,
        chartData,
        ganttData,
        setIsLoading,
        setDashboardData
    } = useDashboardState();


    const handleSearch = async (params: SearchParams) => {
        setIsLoading(true);
        try {

            const [searchRes, summaryData] = await Promise.all([
                handleSearchApi(params),
                handleSummaryApi(params)
            ]);

            setDashboardData(
                params,
                summaryData.summary,
                summaryData.daily
            );
        } catch (error: any) {
            console.error(ERROR_MESSAGES.SEARCH_FAIL, error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='dashboard'>
            <section className='search-section'>

                <SearchFilter
                    onSearch={handleSearch}
                    initialParams={searchParams}
                />
            </section>

            <section className="content-section">
                <div className="summary-container">
                    <div className="summary-text">
                        <h3>Issue Summary</h3>
                        <ul>
                            <li>
                                {DETAIL_LABELS.TOTAL}
                                {chartData.totalIssues}
                                {DETAIL_LABELS.COUNT}
                            </li>
                            <li>
                                {DETAIL_LABELS.OPEN}
                                {chartData.open}
                                {DETAIL_LABELS.COUNT}
                            </li>
                            <li className="status-progress">
                                {DETAIL_LABELS.IN_PROGRESS}
                                {chartData.inProgress}
                                {DETAIL_LABELS.COUNT}
                            </li>
                            <li className="status-overdue">
                                {DETAIL_LABELS.OVERDUE}
                                {chartData.overdue}
                                {DETAIL_LABELS.COUNT}
                            </li>
                            <li className="status-done">
                                {DETAIL_LABELS.DONE}
                                {chartData.done}
                                {DETAIL_LABELS.COUNT}
                            </li>
                        </ul>
                    </div>

                    <div className="summary-chart">
                        <Piechart
                            inProgress={chartData.inProgress}
                            open={chartData.open}
                            done={chartData.done}
                        />
                    </div>
                </div>
            </section>

            <section className="gant-section">
                <GantChart
                    issueData={ganttData}
                    project={searchParams.labels || searchParams.labels}
                />
            </section>
        </div>
    );
};

export default MaindashBoard;