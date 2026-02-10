/**\
 * Piechart
 * 
 * 항목 : In progress, Overdue, Done
 * 가져온 검색 조건 데이터로 설정한 날짜 기준으로 차트를 그림
 * "가져온 검색 조건 데이터"를 실제로 연결하려면 이 컴포넌트가 **Props(속성)**를 통해 외부 데이터를 받을 수 있도록 준비가 되어야 함
 * 
 * npm install chart.js react-chartjs-2 으로 라이브러리 설치
 * 
 */

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

//가져온 데이터 인터페이스
interface PiechartProps {
  inProgress: number;
  open: number;
  done: number;
}
export const Piechart: React.FC<PiechartProps> = ({ inProgress, open, done }) => {
    const total = inProgress + open + done;
    if (total === 0) {
    return <div className="piechart-empty">표시할 데이터가 없습니다.</div>;
  } 
  const data: ChartData<'pie'> = {
    labels: ['In Progress', 'open', 'Done'],
    datasets: [
      {
        data: [inProgress, open, done],
        backgroundColor: ['#80fc8a', '#b4eaee', '#616161'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 컨테이너 크기에 맞추기 위해 필수
    plugins: {
      legend: {
        position: 'bottom' as const, // 범례를 아래로 이동
      },
    },
  };

  return (
    <div className="piechart-container" style={{ height: '300px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};