import React, { useState } from 'react';
import { Input, ControlWrapper, Icons, Icon } from '../../bricks-ui';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearch } from '../../hooks/useSearch';
import { generateBemCls } from '../../bricks-ui/utils';
import { SearchFormPropsType } from '../types';

export const SearchForm: React.FC<SearchFormPropsType> = ({ article, onUpdateArticle, searchBy, mix, caption }) => {

    const [[count, time], updateStatistics] = useState<[number | null, number | null]>([null, null]);
    const updateArticleByFunctional = useSearch(onUpdateArticle, updateStatistics, article, searchBy);
    const [value, onUpdate] = useDebounce(updateArticleByFunctional);

    const formCls: string = generateBemCls({ block: 'searchform', mix });

    const statisticsMessage: string = [
        typeof count === 'number' && count !== NaN && `Найдено: ${count}`,
        typeof count === 'number' && count !== NaN && `Поиск занял: ${time} мс`
    ].filter(Boolean).join('. ');

    return (
        <form className={formCls} onSubmit={(ev) => ev.preventDefault()}>
            <ControlWrapper
                pattern='common'
                size='lg'
                label='Введите фразу для поиска'
                hint={caption}
                mix='searchform__searcher'
                tips={[statisticsMessage]}
            >
                <Input size='xl' placeholder='Например, COVID-19' value={value} onChange={onUpdate}>
                    <Icon>{Icons.Search}</Icon>
                </Input>
            </ControlWrapper>
        </form>
    );
};
