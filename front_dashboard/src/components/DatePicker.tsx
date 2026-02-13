/**
 * datePicker 컴포넌트
 */

import React from 'react';
interface DatePickerProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: string;
    name: string;
    disabled?: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, min, name, disabled }) => {

    const today = new Date().toISOString().split('T')[0];

    return (
        <input
            type="date"
            name={name}
            value={value}
            onChange={onChange}
            min={min}
            max={today}
            disabled={disabled}
        />
    );
};