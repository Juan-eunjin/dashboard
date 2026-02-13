import React from 'react';
import { BACKEND_DEFAULT_VALUES } from '../constants/defaultValue';
import { DETAIL_FILTER_OPTION } from '../constants/labels';

interface StatusSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    name?: string;
}

/**
 * 이슈 상태 선택 컴포넌트
 */
export const StatusSelect: React.FC<StatusSelectProps> = ({
    value,
    onChange,
    disabled,
    name = "status"
}) => {
    return (
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
        >
            <option value={BACKEND_DEFAULT_VALUES.ALL}>
                {DETAIL_FILTER_OPTION.ALL}
            </option>
            <option value={BACKEND_DEFAULT_VALUES.OPEN}>
                {DETAIL_FILTER_OPTION.OPEN}
            </option>
            <option value={BACKEND_DEFAULT_VALUES.IN_PROGRESS}>
                {DETAIL_FILTER_OPTION.IN_PROGRESS}
            </option>
            <option value={BACKEND_DEFAULT_VALUES.DONE}>
                {DETAIL_FILTER_OPTION.DONE}
            </option>
        </select>
    );
};
