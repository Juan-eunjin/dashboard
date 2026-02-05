/**
 * 메인 대시보드 페이지
 */

import '../styles/MaindashBoard.css';
import React, { useState } from 'react';
import { SearchFilter } from '../components/SearchFilter'; 
import { Piechart } from '../components/Piechart';       
import '../styles/MaindashBoard.css';
import { IssueChart } from '../components/GantChart';

const MaindashBoard = () => {
    //검색 조건 관리
    const [searchParams, setSearchParams] = useState({
        project : '',
        startDate: '',
        endDate: ''
    });
    
    //파이 차트 임시 데이터
    const [chartData, setChartData] = useState({
        inProgress: 5,
        overdue: 6,
        done: 0
    });

    const [ganttData, setGanttData] = useState([
      { "date": "2026-02-01", "count": 5 },
      { "date": "2026-02-02", "count": 7 },
      { "date": "2026-02-03", "count": 8 },
      { "date": "2026-02-04", "count": 3 }
    ]);

    //조회 버튼 클릭 시 
    const handleSearch = (params: any) => {
      setSearchParams(params);
      console.log("조회 조건:", params);
    }


    return (
        <div className='dashboard'>
            <section className='search-section'>
                <SearchFilter onSearch={handleSearch} />
            </section>

       {/* 대시보드 메인 콘텐츠 영역 (이슈 요약) */}
      <section className="content-section">

        <div className="summary-container">
          {/* 왼쪽: 텍스트 요약 (설계서 참고) */}
          <div className="summary-text">
            <h3>Issue Summary</h3>
            <ul>
              <li>Total Issues: {chartData.inProgress + chartData.overdue + chartData.done} 개</li>
              <li className="status-progress">In Progress: {chartData.inProgress} 개</li>
              <li className="status-overdue">Overdue: {chartData.overdue} 개</li>
              <li>Done: {chartData.done} 개</li>
            </ul>
          </div>

          {/* 오른쪽: 파이 차트 */}
          <div className="summary-chart">
            <Piechart 
              inProgress={chartData.inProgress} 
              overdue={chartData.overdue} 
              done={chartData.done} 
            />
          </div>
        </div>
      </section>
      
      {/* 하단 간트 차트 영역 */}
      <section className="gant-section">
        { <IssueChart issueData={ganttData} /> }
      </section>

    </div>


    );


};

export default MaindashBoard;