import React, { useState } from 'react';
import { Input, ControlWrapper, Icons, Icon } from '../../bricks';
import { useDebouncedInput } from '../../hooks/useDebouncedInput';
import { useSearch } from '../../hooks/useSearch';
import { generateBemCls } from '../../bricks/utils';

export const SearchForm = ({ article, onUpdateArticle, searcher, mix }) => {

    const [[count, time], updateStatistics] = useState([null, null]);
    const updateArticleByFunctional = useSearch(onUpdateArticle, updateStatistics, article, searcher);
    const [value, onUpdate] = useDebouncedInput(updateArticleByFunctional);

    const formCls = generateBemCls({ block: 'searchform', mix });

    const statisticsMessage = [
        typeof count === 'number' && `Найдено: ${count}`,
        typeof count === 'number' && `Поиск занял: ${time} мс`
    ].filter(Boolean).join('. ');

    return (
        <form className={formCls} onSubmit={(ev) => ev.preventDefault()}>
            <ControlWrapper
                pattern='common'
                size='lg'
                label='Введите фразу для поиска'
                hint='Поиск в функциональном стиле'
                mix='searchform__searcher'
                tips={[statisticsMessage]}
            >
                <Input size='lg' placeholder='Например, COVID-19' value={value} onChange={onUpdate}>
                    <Icon>{Icons.Search}</Icon>
                </Input>
            </ControlWrapper>
            {/* <div className='searchform__statistics'>
                {count !== null && <span className='searchform__statistics-item'>Найдено: {count}</span>}
                {time !== null && <span className='searchform__statistics-item'>Поиск занял: {time} мс</span>}
            </div> */}
        </form>
    );
};
