import '../styles/DetailTable.css';
import React from 'react';

// 1. 포스트맨 이미지에서 확인된 필드명과 대소문자를 정확히 일치시킵니다.
interface IssueItem {
  issueKey: string;    // 'issueKey' (K 대문자)
  summary: string;     // title 대신 'summary' 사용
  status: string;      // 'status'
  assignee: string | null; // null 값이 올 수 있으므로 처리
  issueDate: string;   // 'issueDate' (D 대문자)
  dueDate: string | null;  // 'dueDate' (D 대문자)
  labels?: string;     // 포스트맨에선 안 보였으나 검색 조건 유지 위해 추가
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
            <th>No</th>
            <th>이슈번호</th>
            <th>이슈제목</th>
            <th>프로젝트 명</th>
            <th>담당자</th>
            <th>상태</th>
            <th>생성일</th>
            <th>마감일</th>
          </tr>
        </thead>
        <tbody>
          {issues.length > 0 ? (
            issues.map((issue, index) => {
              // 페이지 번호에 따른 누적 No 계산
              const calculatedNo = (currentPage - 1) * limit + index + 1;

              return (
                /* 2. 고유 키값(key) 경고 해결을 위해 issueKey 사용 */
                <tr key={issue.issueKey}>
                  <td>{calculatedNo}</td>
                  <td>{issue.issueKey}</td>
                  <td className="title-cell">{issue.summary || '제목 없음'}</td>
                  <td>{issue.labels || 'N/A'}</td>
                  {/* 포스트맨에서 null이었던 항목들 처리 */}
                  <td>{issue.assignee || '미배정'}</td>
                  <td>
                    <span className={`status-badge ${issue.status?.replace(/\s/g, '-')}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td>{issue.issueDate}</td>
                  <td>{issue.dueDate || '-'}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={8} className="empty-row">조회된 이슈가 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};