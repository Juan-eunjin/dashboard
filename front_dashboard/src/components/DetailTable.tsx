import { TABLE_DEFAULT_VALUES } from '../constants/defaultValue';
import { TABLE_LABELS } from '../constants/labels';
import { ALERT_MESSAGES } from '../constants/messages';
import '../styles/DetailTable.css';
import React from 'react';


interface IssueItem {
  issueKey: string;
  summary: string;
  status: string;
  assignee: string | null;
  issueDate: string;
  dueDate: string | null;
  labels?: string;
}

interface DetailTableProps {
  issues: IssueItem[];
  limit?: number;
  currentPage: number;
}

export const DetailTable: React.FC<DetailTableProps> = ({ issues, limit = 10, currentPage }) => {
  return (
    <div className="table-container">
      <table className="detail-table">
        <thead>
          <tr>
            <th>{TABLE_LABELS.NO}</th>
            <th>{TABLE_LABELS.ISSUE_NUMBER}</th>
            <th>{TABLE_LABELS.TITLE}</th>
            <th>{TABLE_LABELS.PROJECT_NAME}</th>
            <th>{TABLE_LABELS.ASSIGNEE}</th>
            <th>{TABLE_LABELS.STATUS}</th>
            <th>{TABLE_LABELS.START_DATE}</th>
            <th>{TABLE_LABELS.DUE_DATE}</th>
          </tr>
        </thead>
        <tbody>
          {issues.length > 0 ? (
            issues.map((issue, index) => {
              const calculatedNo = (currentPage - 1) * limit + index + 1;

              return (
                <tr key={issue.issueKey}>
                  <td>{calculatedNo}</td>
                  <td>{issue.issueKey}</td>
                  <td className="title-cell">
                    {issue.summary || TABLE_DEFAULT_VALUES.NO_TITLE}
                  </td>
                  <td>
                    {issue.labels || TABLE_DEFAULT_VALUES.NO_PROHECT}
                  </td>
                  <td>
                    {issue.assignee || TABLE_DEFAULT_VALUES.UNASSIGNED}
                  </td>
                  <td>
                    <span className={`status-badge ${issue.status?.replace(/\s/g, '-')}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td>
                    {issue.issueDate}
                  </td>
                  <td>
                    {issue.dueDate || TABLE_DEFAULT_VALUES.NO_DUE_DATE}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="empty-row">
                {ALERT_MESSAGES.NO_ISSUES_FOUND}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};