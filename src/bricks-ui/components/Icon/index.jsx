import React from 'react';
import { CONFIG } from './config';
import { generateBemCls } from '../../utils';

export const Icon = (props) => {
    const {
        pattern = 'common', size = 'md', title, id, tabIndex, ariaLabel, mix, onClick = () => { }, children, dataTestId, reactRef
    } = props;

    const mods = {
        [pattern]: true,
        [size]: true
    };
    const generatedCls = generateBemCls({ block: CONFIG.bemBlockName, mods, mix });

    return (
        <span
            className={generatedCls}
            id={id}
            title={title}
            tabIndex={tabIndex}
            aria-label={ariaLabel}
            dangerouslySetInnerHTML={{ __html: children }}
            onClick={onClick}
            data-test-id={dataTestId}
            ref={reactRef}
        >
        </span>
    );
};