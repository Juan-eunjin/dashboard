/**
 * 로딩 상태를 관리하는 커스텀 훅
 * 
 * Hook을 만드는 방법:
 * 1. 'use'로 시작하는 함수 이름을 정합니다.
 * 2. 함수 내부에서 useState, useEffect 등 다른 Hook을 호출합니다.
 * 3. 필요한 상태(state)와 함수 등을 반환합니다.
 */
import { useState, useCallback } from 'react';

export const useLoading = (initialState = false) => {
    // 1. 상태 정의
    const [isLoading, setIsLoading] = useState(initialState);

    /**
     * 비동기 작업을 처리하는 래퍼 함수
     * 로딩 상태를 자동으로 true -> false로 변경합니다.
     * useCallback을 사용하여 컴포넌트 리렌더링 시 함수가 재생성되는 것을 방지합니다.
     */
    const withLoading = useCallback(async (asyncFn: () => Promise<void>) => {
        setIsLoading(true);
        try {
            await asyncFn();
        } finally {
            setIsLoading(false);
        }
    }, []);

    // 2. 상태와 함수 반환
    return {
        isLoading,
        withLoading,
        setIsLoading, // 수동 제어가 필요한 경우를 위해 반환
    };
};
