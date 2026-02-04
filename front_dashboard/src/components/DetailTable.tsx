/**
 * 이슈 리스트에 대한 테이블 컴포넌트
 * 
 * 표 항목 : No, 이슈번호, 이슈제목, 프로젝트 명, 담당자, 상태, 생성일, 마감일
 * no를 제외하고 모두 나중에 filercheck에서 받아온 필터 값에 따라 조회
 */

import '../styles/DetailTable.css';

// 1. 개별 이슈에 대한 타입 정의 (필수 항목 포함)
interface IssueItem {
  id: string;          // 이슈번호
  title: string;       // 이슈제목
  projectName: string; // 프로젝트 명
  assignee: string;    // 담당자
  status: string;      // 상태
  createdAt: string;   // 생성일
  dueDate: string;     // 마감일
}

interface DetailTableProps {
  issues: IssueItem[]; // 실제 출력할 이슈 리스트 (필수)
  limit?: number;      // 한 페이지에 보여줄 개수 (선택)
  currentPage: number;   // 현재 페이지 번호 (누적 No 계산을 위해 추가)
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
              // 페이지 번호에 따른 누적 No 계산 공식
              // (현재 페이지 - 1) * 페이지당 개수 + 현재 인덱스 + 1
              const calculatedNo = (currentPage - 1) * limit + index + 1;

              return (
                <tr key={issue.id}>
                  <td>{calculatedNo}</td>
                  <td>{issue.id}</td>
                  <td className="title-cell">{issue.title}</td>
                  <td>{issue.projectName}</td>
                  <td>{issue.assignee}</td>
                  <td>
                    <span className={`status-badge ${issue.status.toLowerCase().replace(' ', '-')}`}>
                      {issue.status}
                    </span>
                  </td>
                  <td>{issue.createdAt}</td>
                  <td>{issue.dueDate}</td>
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

