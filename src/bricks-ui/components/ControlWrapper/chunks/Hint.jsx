import React, { useMemo } from 'react';
import { Tooltip, Icon, Icons } from '../../../index';
import { generateBemCls } from '../../../utils';
import { CONFIG } from '../config';

export const Hint = ({ message, size }) => {
    const hintCls = useMemo(() => generateBemCls({ block: CONFIG.bemBlockName, elem: 'hint' }));
    const iconCls = useMemo(() => generateBemCls({ block: CONFIG.bemBlockName, elem: 'hint-icon' }));

    return (
        <Tooltip content={message} mix={hintCls}>
            <Icon mix={iconCls} size={CONFIG.iconSizes[size]}>{Icons.QuestionOutline}</Icon>
        </Tooltip>
    );
};