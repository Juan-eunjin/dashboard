import '../styles/MaindashBoard.css';
import { SearchFilter } from '../components/SearchFilter';
import { type SearchParams } from '../api/handleSummaryApi';
import { Piechart } from '../components/Piechart';
import { GantChart } from '../components/GantChart';
import { HEADER_TITLE } from '../constants/labels';
import { fetchDashboardData } from '../api/fetchDashboardData';
import { IssueCountComponent } from '../components/IssueCount';
import { useDashboardState } from '../hooks/dashboardState';

const MaindashBoard = () => {

    const {
        searchParams,
        chartData,
        ganttData,
        withLoading,
        setDashboardData
    } = useDashboardState();

    const handleSearch = async (params: SearchParams) => {
        await withLoading(async () => {
            const { summaryData } = await fetchDashboardData(params);

            setDashboardData(
                params,
                summaryData.summary,
                summaryData.daily
            );
        });
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
                        <h3>{HEADER_TITLE.SUMMARY}</h3>
                        <IssueCountComponent chartData={chartData} />
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