/**
 * 이슈 상세 정보 출력 컴포넌트
 * 
 * 기간 , 이슈 상태
 * 
 * 진입 방법에 따라 출력 형식 차별화
 * 
 * 1. Issue summary에서 원형 차트 상태 부분 클릭 시 진입 경우
 * - 검색된 기간 동안의 이슈 상태에 따른 분류 출력
 * 
 * 
 * 2. Gantt chart에서 특정 날짜 클릭 시 진입 경우
 * - 해당 날짜에 생성된 이슈 목록 출력
 * - 이슈 상태 : 전체
 * 
 */

import '../styles/FilterCheck.css';
import React, { useEffect, useState } from 'react';

//이후 상세페이지에 넘어올때 가져올 필터 값들
interface FilterCheckProps {
  initialDate?: string;
  initialStatus?: string;
  onFilterChange: (filters: { status: string; startDate: string; endDate: string }) => void;
}

export const FilterCheck: React.FC<FilterCheckProps> = ({ 
    initialStatus, 
    initialDate, 
    onFilterChange 
}) => {
    const [status, setStatus] = useState(initialStatus);
    const [startDate, setStartDate] = useState(initialDate);
    const [endDate, setEndDate] = useState(initialDate);

    //페이지 이동 시 URL이 바뀌어 값이 들어온다면 반영하기 위한 효과
    useEffect(() => {
        if (initialDate) {
            setStartDate(initialDate);
            setEndDate(initialDate);
        }
        if (initialStatus) 
            setStatus(initialStatus);
    }, [initialDate, initialStatus]);

    return (
        <div className="check-container">
            <div className="date-group">
                <label> 기간 </label>
                <input 
                    type="date" 
                    value={startDate} 
                    readOnly 
                    className="startDate-input"
                />
                <span> ~ </span>
                <input 
                    type="date" 
                    value={endDate} 
                    readOnly 
                    className="endDate-input"
                />
            </div>

            <div className="status-group">
                <label> 이슈 상태 </label>
                <input 
                  type="text" 
                  value={status} 
                  readOnly
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="상태 입력"
                />
            </div>
        </div>

    );
};
