
import React, { useMemo, useState } from 'react';
import { MessageList } from './MessageList';
import { Hint } from './Hint';
import { CONFIG } from '../config';
import { generateBemCls, getGuid } from '../../../utils';

export const Body = (props) => {
    const {
        pattern = 'common', size = 'md',
        label = '', hint = '', warnings = [], tips = [], isRequired,
        id, mix, children, reactRef
    } = props;

    const combinedMods = {
        [pattern]: true,
        [size]: true,
        'required': isRequired
    };
    const blockCls = generateBemCls({ block: CONFIG.bemBlockName, mods: combinedMods, mix });
    const captionCls = useMemo(() => generateBemCls({ block: CONFIG.bemBlockName, elem: 'caption' }));
    const contentCls = useMemo(() => generateBemCls({ block: CONFIG.bemBlockName, elem: 'content' }));
    const hintMixCls = useMemo(() => generateBemCls({ block: CONFIG.bemBlockName, elem: 'hint' }));
    const signCls = useMemo(() => generateBemCls({ block: CONFIG.bemBlockName, elem: 'required-sign' }));

    const [labelId] = useState(getGuid());
    const hasMessages = !!tips.length || !!warnings.length;

    return (
        <div className={blockCls} role='group' aria-labelledby={labelId} id={id} ref={reactRef}>

            <div className={captionCls} id={labelId}>
                <span>{label}</span>
                {isRequired && <span className={signCls} aria-label='Field is required'>*</span>}
                {hint && <Hint message={hint} mix={hintMixCls} />}
            </div>

            <div className={contentCls} >
                {children}
                {hasMessages && <MessageList tips={tips} warnings={warnings} />}
            </div>

        </div>
    );
};
