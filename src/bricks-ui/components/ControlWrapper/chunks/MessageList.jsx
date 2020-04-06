import React, { useMemo } from 'react';
import { CONFIG } from '../config';
import { generateBemCls } from '../../../utils';

export const MessageList = ({ tips, warnings }) => {
    const listCls = useMemo(() => generateBemCls({ block: CONFIG.bemBlockName, elem: 'message-list' }));
    const helpCls = useMemo(() => generateBemCls({ block: CONFIG.bemBlockName, elem: 'message', mods: { 'help': true } }));
    const warningCls = useMemo(() => generateBemCls({ block: CONFIG.bemBlockName, elem: 'message', mods: { 'warning': true } }));

    return (
        <ul className={listCls}>
            {tips.map((item, index) =>
                <li className={helpCls} key={`${item.length}_${index}`}>{item}</li>
            )}
            {warnings.map((item, index) =>
                <li className={warningCls} key={`${item.length}_${index}`}>{item}</li>
            )}
        </ul>
    );
};