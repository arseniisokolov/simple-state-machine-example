import { useState, useEffect } from 'react';

export const useInputFormatting = (initialValue, onChange, formatOnChange) => {

    const [value, updateValue] = useState(initialValue);

    useEffect(() => {
        if (value === initialValue) {
            return;
        }
        onChange(formatOnChange(value));
    }, [value]);

    return [value, updateValue];
};