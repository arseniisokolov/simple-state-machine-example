
import React from 'react';
import { CONFIG } from '../config';
import { generateBemCls } from '../../../utils';

export const ViewMode = ({ value, size = 'md', pattern = 'common', hasError, reactRef, emptyCaption = '', mix, isFullWidth }) => {

    const combinedMods = {
        [size]: true,
        [pattern]: true,
        'has-error': hasError,
        'readonly': true,
        'full-width': isFullWidth
    };

    const generatedCls = generateBemCls({ block: CONFIG.bemBlockName, mods: combinedMods, mix });
    const handledValue = (value === null || value === undefined || value === '') ? emptyCaption : value;

    return (
        <span className={generatedCls} ref={reactRef}>
            {handledValue}
        </span>
    );
};
