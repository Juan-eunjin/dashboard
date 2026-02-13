import { DETAIL_LABELS } from '../constants/labels';
import React from 'react';

import '../styles/IssueCount.css';

interface IssueCountProps {
    chartData: {
        totalIssues: number;
        open: number;
        inProgress: number;
        overdue: number;
        done: number;
    };
}

/**
 * 이슈 개수 컴포넌트
 * 
 * @param chartData 이슈 개수 데이터
 * @returns 이슈 개수 컴포넌트
 */
export const IssueCountComponent: React.FC<IssueCountProps> = ({ chartData }: IssueCountProps) => {
    return (
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
    );
};