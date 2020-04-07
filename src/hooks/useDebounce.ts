import { useState, useEffect, SetStateAction, Dispatch } from 'react';

export function useDebounce<T>(onUpdate: Function): [T, Dispatch<SetStateAction<T>>] {
    const [value, updateValue] = useState<T>();

    useEffect(() => {
        const timeout = setTimeout(() => onUpdate(value), 100);
        return () => clearTimeout(timeout);
    }, [value]);

    return [value, updateValue];
};