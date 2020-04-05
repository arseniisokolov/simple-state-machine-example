import React from 'react';
import { Input, ControlWrapper, Icons, Icon } from '../../bricks';
import { useDebouncedInput } from '../../hooks/useDebouncedInput';

export const SearchForm = ({ onUpdate }) => {

    const [value, update] = useDebouncedInput(onUpdate);

    return (
        <form>
            <ControlWrapper
                label='Введите фразу для поиска'
                hint='Поиск в функциональном стиле'
            >
                <Input placeholder='Например, COVID-19' value={value} onChange={update}>
                    <Icon>{Icons.Search}</Icon>
                </Input>
            </ControlWrapper>
        </form>
    );
};
