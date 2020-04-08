import { useState, useEffect } from 'react';
import { UseDebounceHookType } from './types';

export const useDebounce: UseDebounceHookType = (onUpdate) => {
    const [value, updateValue] = useState<any>();

    useEffect(() => {
        const timeout = setTimeout(() => onUpdate(value), 100);
        return () => clearTimeout(timeout);
    }, [value]);

    return [value, updateValue];
};