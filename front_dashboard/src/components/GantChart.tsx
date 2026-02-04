/**
 * 간트 차트 컴포넌트
 * 일일 이슈 발생 갯수 내역을 표시
 * 최대 1개월 기간까지 표시 예정
 * 
 * 날짜 선택시 페이지 이동하는 방식을 후에 추가할 예정임
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { use } from 'react';
import { Line } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IssueData {
  date: string;
  count: number;
}

export const IssueChart: React.FC<{ issueData: IssueData[] }> = ({ issueData }) => {

    const navigate = useNavigate();

    //차트의 제목, 눈금 범위, 범례 표시 여부 등 '디자인과 기능' 설정
    const options = {
        responsive: true,
        onClick: (event: any, elements: any[]) => {
        // 차트의 데이터 포인트(점)를 클릭했을 때만 동작
        if (elements.length > 0) {
            const index = elements[0].index; 
            const selectedDate = issueData[index].date; 
            const selectedCount = issueData[index].count;

        console.log(`클릭된 날짜: ${selectedDate}, 개수: ${selectedCount}`);

        // 상세 페이지로 이동하며 데이터 전달
        navigate('/detail', { 
          state: { 
            date: selectedDate, 
            count: selectedCount,
            from: 'gantt'
          } 
        });
      }
    },
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: '일일 이슈 발생 내역' },
            },
        onHover: (event: any, chartElement: any) => {
            event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
        }
    };

  const data = {
    labels: issueData.map((d) => d.date),
    datasets: [
      {
        label: '이슈 발생 건수',
        data: issueData.map((d) => d.count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 6,
        pointHoverRadius: 10,
      },
    ],
  };

  return <Line options={options} data={data} />;
};