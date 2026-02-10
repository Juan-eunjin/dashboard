import '../styles/MaindashBoard.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchFilter } from '../components/SearchFilter'; 
import { Piechart } from '../components/Piechart';       
import { IssueChart } from '../components/GantChart';

const MaindashBoard = () => {
    // 오늘 날짜 계산 (YYYY-MM-DD 형식)
    const getTodayStr = () => new Date().toISOString().split('T')[0];

    // 검색 조건 상태 관리
    const [searchParams, setSearchParams] = useState({
        project: '',
        startDate: getTodayStr(), 
        endDate: getTodayStr()
    });
    
    // 차트 및 요약 데이터 상태 관리
    const [chartData, setChartData] = useState({
        inProgress: 0,
        open: 0,
        done: 0,
        overdue: 0
    });

    const [ganttData, setGanttData] = useState([]);

    /**
     * 데이터를 조회하고 검색 조건을 세션에 저장하는 함수
     */
    const handleSearch = async (params: any) => {
        // 1. 상태 업데이트 및 세션 스토리지 저장
        setSearchParams(params);
        sessionStorage.setItem('searchParams', JSON.stringify(params)); 

        try {
            // API를 동시에 호출하여 성능 최적화
            const [summaryRes, ganttRes, dailyRes] = await Promise.all([
                axios.get('/api/summary', {
                    params: {
                        labels: params.project,
                        startDate: params.startDate,
                        endDate: params.endDate
                    }
                }),
                axios.get('/api/search/issuesdate', {
                    params: {
                        label: params.project,
                        startDate: params.startDate,
                        endDate: params.endDate
                    }
                }),
                axios.get('/api/daily-issues', {
                    params: { 
                        labels: params.project, 
                        startDate: params.startDate, 
                        endDate: params.endDate 
                    }
                })
            ]);

            // 상단 요약 수치 및 파이 차트 업데이트
            if (summaryRes.data) {
                setChartData({
                    inProgress: summaryRes.data.inProgress || 0,
                    open: summaryRes.data.open || 0,
                    done: summaryRes.data.done || 0,
                    overdue: summaryRes.data.overdue || 0
                });
            }

            // 간트 차트(일별 발생 건수) 데이터 업데이트
            if (dailyRes.data) {
                const formattedData = dailyRes.data.map((item: any) => ({
                    date: item.issueDate, 
                    count: item.totalIssues
                }));
                setGanttData(formattedData); 
            }

        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data);
            } else {
                console.error("검색 중 오류가 발생했습니다.", error);
            }
        }
    };

    /**
     * 페이지 마운트 시 실행: 세션 스토리지 확인 및 데이터 복구
     */
    useEffect(() => {
        const savedParams = sessionStorage.getItem('searchParams');
        
        if (savedParams) {
            // 저장된 조건이 있으면 해당 조건으로 자동 조회
            const parsed = JSON.parse(savedParams);
            console.log("세션에서 데이터 복구 중...", parsed);
            setSearchParams(parsed);
            handleSearch(parsed); 
        } else {
            // 저장된 조건이 없으면 오늘 날짜로 초기 조회
            const initialParams = {
                project: '',
                startDate: getTodayStr(),
                endDate: getTodayStr()
            };
            handleSearch(initialParams);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // 딱 한 번만 실행되도록 설정

    return (
        <div className='dashboard'>
            <section className='search-section'>
                {/* SearchFilter에도 복구된 검색 조건을 내려줘야 
                  입력창이 비어있지 않고 유지됩니다. 
                */}
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
                            <li>Total Issues: {chartData.inProgress + chartData.open + chartData.done} 개</li>
                            <li>Open Issues: {chartData.open} 개</li>
                            <li className="status-progress">In Progress: {chartData.inProgress} 개</li>
                            <li className="status-overdue">Overdue: {chartData.overdue} 개</li>
                            <li>Done: {chartData.done} 개</li>
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
                <IssueChart 
                    issueData={ganttData} 
                    project={searchParams.project}
                />
            </section>
        </div>
    );
};

export default MaindashBoard;