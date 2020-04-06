import React from 'react';
import { CONFIG } from '../config';
import { generateBemCls } from '../../../utils';
import { useInputFormatting } from '../../../hooks/useInputFormatting';

export const EditMode = (props) => {
    const {
        pattern = 'common', size = 'md', value = '', placeholder = '', type = 'text', id, name, htmlPattern, autocomplete,
        autofocus, maxlength, minlength, min, max, dataTestId, reactRef, isFullWidth,
        isDisabled, hasError, tabIndex, ariaLabel, mix, onChange = () => { }, onBlur = () => { }, onFocus = () => { }, formatOnChange = v => v
    } = props;

    const [formattedValue, updateWithFormatting] = useInputFormatting(value, onChange, formatOnChange);

    const combinedMods = {
        [size]: true,
        [pattern]: true,
        'has-error': hasError,
        'full-width': isFullWidth
    };

    const generatedCls = generateBemCls({ block: CONFIG.bemBlockName, mods: combinedMods, mix });

    return (
        <input
            className={generatedCls}
            type={type}
            disabled={isDisabled}
            id={id}
            tabIndex={tabIndex}
            aria-label={ariaLabel}
            value={formattedValue}
            placeholder={placeholder}
            name={name}
            pattern={htmlPattern}
            autoFocus={autofocus}
            autoComplete={autocomplete}
            maxLength={maxlength}
            minLength={minlength}
            min={min}
            max={max}
            onChange={({ target: { value } }) => updateWithFormatting(value)}
            onBlur={onBlur}
            onFocus={onFocus}
            data-test-id={dataTestId}
            ref={reactRef}
        />
    );
};
