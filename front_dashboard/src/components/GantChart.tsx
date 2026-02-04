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
import React from 'react';
import { Line } from 'react-chartjs-2';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//차트의 제목, 눈금 범위, 범례 표시 여부 등 '디자인과 기능' 설정
const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: '일일 이슈 발생 내역' },
  },
};

interface IssueData {
  date: string;
  count: number;
}

export const IssueChart: React.FC<{ issueData: IssueData[] }> = ({ issueData }) => {
  const data = {
    labels: issueData.map((d) => d.date),
    datasets: [
      {
        label: '이슈 발생 건수',
        data: issueData.map((d) => d.count),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};