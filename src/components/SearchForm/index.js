import React from 'react'
import _ from 'lodash';
import { useDebouncedInput } from './useDebouncedInput';

export const SearchForm = ({ onUpdate }) => {

    const [value, update] = useDebouncedInput(onUpdate);

    return (
        <form>
            <input placeholder='Например, COVID-19' value={value} onChange={({ target: { value } }) => update(value)} />
        </form>
    );
};
