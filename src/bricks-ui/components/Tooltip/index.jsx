import React, { useState, useRef, useEffect } from 'react';
import { CONFIG } from './config';
import { generateBemCls } from '../../utils';

export const Tooltip = ({
    id, content, ariaLabel, mix, children, dataTestId
}) => {
    const [isReadyForShow, toggleReadyForShow] = useState();
    const [[isVisible, position], setVisibleParams] = useState([]);
    const blockRef = useRef(null);
    const bodyRef = useRef(null);

    const calculatePosition = (block, body) => {
        const blockEdges = block.getBoundingClientRect();
        const bodyEdges = body.getBoundingClientRect();

        if (blockEdges.left > window.innerWidth - bodyEdges.width) {
            return 'left';
        }
        if ((blockEdges.left + (blockEdges.width / 2)) < bodyEdges.width) {
            return 'right';
        }
        if (blockEdges.top > window.innerHeight - bodyEdges.height) {
            return 'top';
        }
        if ((blockEdges.top + (blockEdges.height / 2)) < bodyEdges.height) {
            return 'bottom';
        }
        return 'top';
    };

    useEffect(() => {
        setVisibleParams([isReadyForShow, calculatePosition(blockRef.current, bodyRef.current)]);
    }, [blockRef.current && bodyRef.current, isReadyForShow]);

    const mods = {
        'hidden': !isVisible
    };

    const blockCls = generateBemCls({ block: CONFIG.bemBlockName, mods, mix });
    const bodyCls = generateBemCls({ block: CONFIG.bemBlockName, elem: 'body', mods: { 'position': position } });

    return (
        <div
            className={blockCls}
            onMouseEnter={() => toggleReadyForShow(true)}
            onMouseLeave={() => toggleReadyForShow(false)}
            ref={blockRef}
            id={id}
            data-test-id={dataTestId}
        >
            {children}
            <div className={bodyCls} aria-label={ariaLabel} ref={bodyRef}>{content}</div>
        </div>
    );

};