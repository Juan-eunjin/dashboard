import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartData } from 'chart.js';
import { ALERT_MESSAGES } from '../constants/messages';
import { DETAIL_LABELS } from '../constants/labels';


ChartJS.register(ArcElement, Tooltip, Legend);

interface PiechartProps {
  inProgress: number;
  open: number;
  done: number;
}
export const Piechart: React.FC<PiechartProps> = ({ inProgress, open, done }) => {
  const total = inProgress + open + done;
  if (total === 0) {
    return <div className="piechart-empty">
      {ALERT_MESSAGES.NO_DATA_AVAILABLE}
    </div>;
  }
  const data: ChartData<'pie'> = {
    labels: [
      DETAIL_LABELS.IN_PROGRESS,
      DETAIL_LABELS.OPEN,
      DETAIL_LABELS.DONE
    ],
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="piechart-container" style={{ height: '300px' }}>
      <Pie data={data} options={options} />
    </div>
  );
};