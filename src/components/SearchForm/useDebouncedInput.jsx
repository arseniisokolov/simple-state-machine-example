import { useState, useEffect } from 'react';

export const useDebouncedInput = (onUpdate) => {
    const [value, updateValue] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => onUpdate(value), 1000);
        return () => clearTimeout(timeout);
    }, [value]);

    return [value, updateValue];
};