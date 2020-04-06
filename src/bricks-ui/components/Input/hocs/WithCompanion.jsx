import React from 'react';
import { generateBemCls } from '../../../utils';

export const WithCompanion = OriginalComponent => props => {
    const wrapCls = generateBemCls({ block: 'bricks-input-with-companion' });
    const companionCls = generateBemCls({ block: 'bricks-input-with-companion', elem: 'companion', mods: { 'disabled': props.isDisabled } });
    const componentCls = generateBemCls({ block: 'bricks-input-with-companion', elem: 'input' });
    const componentMix = `${props.mix} ${componentCls}`;

    return props.children ?
        <div className={wrapCls}>
            <OriginalComponent {...props} mix={componentMix} />
            <div className={companionCls}>
                {props.children}
            </div>
        </div>
        :
        <OriginalComponent {...props} />;
};