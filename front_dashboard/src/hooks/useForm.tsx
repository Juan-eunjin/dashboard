import { useState, useCallback } from 'react';

/**
 * 선택된 폼 값들을 관리하는 커스텀 훅
 * @template T 
 * @param initialValues 
 */

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);

    const handleChange = useCallback((
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);


    const reset = useCallback(() => setValues(initialValues), [initialValues]);

    return {
        values,
        setValues,
        handleChange,
        reset,
    };
};