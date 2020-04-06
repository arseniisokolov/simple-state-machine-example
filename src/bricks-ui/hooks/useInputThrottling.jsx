import { useState, useEffect } from 'react';

/**
 * TO DO: возможно, применить для отработки событий mouse
 */
export const useInputThrottling = (initialValue, onUpdate) => {
    const [value, updateValue] = useState(initialValue);

    useEffect(() => {
        const timeout = setTimeout(() => onUpdate(value), 1000);
        return () => clearTimeout(timeout);
    }, [value]);

    return [value, updateValue];
};