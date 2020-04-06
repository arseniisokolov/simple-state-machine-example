import React, { useState } from 'react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import { getRadioKnobs } from '../../../../.storybook/bricks-stand/utils';
import { getIconsSvgArray } from '../../../utils';
import { Input, Icon, Icons } from '../../../index';
import { Story, StoryItem, StoryCode, AllInOneStory } from '../../../../.storybook/bricks-stand/components';
import { withCustomStoryConfig } from '../../../../.storybook/bricks-stand/hocs';

const iconsArray = getIconsSvgArray().map(([icon]) => icon);

const propsConfig = {
    pattern: ['common'],
    size: ['md', 'lg', 'xl'],
    value: ['', 'Коротко', 'Непомерно длинно, непонятно зачем только это написали?'],
    isDisabled: [true],
    isReadonly: [true],
    hasError: [true],
    type: ['text', 'password', 'number', 'tel', 'email'],
    children: iconsArray.map(i => <Icon>{i}</Icon>),
    isFullWidth: [true]
};

const getIsDisabled = () => boolean('Is Disabled', false);
const getPlaceholder = () => text('Placeholder', 'Введите текст');
const getEmptyCaption = () => text('Empty Caption', 'Не указано');
const getIsReadonly = () => boolean('Is Readonly', false);
const getHasError = () => boolean('Has Error', false);
const getIsFullWidth = () => boolean('Is Full Width', false);

const getIconsSelectKnobs = () => {
    const icons = Object.keys(Icons).reduce((acc, item) => ({ ...acc, [item]: item }), { None: null });
    const icon = select('With Companion', icons, null);

    return {
        icon: icon && <Icon onClick={() => alert('Clicked on Companion')}>{Icons[icon]}</Icon>,
        name: icon && `<Icon>{Icons.${icon}}</Icon>`,
    };
};

export default withCustomStoryConfig({
    title: 'Components|Input',
    decorators: [withKnobs]
});

export const Playground = (props) => {

    const [currentValue, setValue] = useState('');

    return (
        <Story title="Текстовое поле" {...props}>
            <StoryItem>
                {currentValue}
                <form onSubmit={(evt) => (evt.preventDefault(), alert(currentValue))}>
                    <Input
                        size={getRadioKnobs('size', propsConfig)}
                        type={getRadioKnobs('type', propsConfig)}
                        value={currentValue}
                        placeholder={getPlaceholder()}
                        emptyCaption={getEmptyCaption()}
                        isDisabled={getIsDisabled()}
                        isReadonly={getIsReadonly()}
                        isFullWidth={getIsFullWidth()}
                        hasError={getHasError()}
                        onChange={setValue}
                        dataTestId='testInput'
                    >
                        {getIconsSelectKnobs().icon}
                    </Input>
                </form>
                <StoryCode>
                    {`<Input size='${getRadioKnobs('size', propsConfig)}' type='${getRadioKnobs('type', propsConfig)}' placeholder='${getPlaceholder()}' emptyCaption='${getEmptyCaption()}'${getIsDisabled() ? ' isDisabled' : ''}${getIsReadonly() ? ' isReadonly' : ''}${getIsFullWidth() ? ' isFullWidth' : ''}${getHasError() ? ' hasError' : ''}${currentValue ? ` value='${currentValue}'` : ''}>${getIconsSelectKnobs().name || ''}</Input>`}
                </StoryCode>
            </StoryItem>
        </Story>
    );
};

export const AllInOne = (props) => (
    <Story {...props}>
        <AllInOneStory config={propsConfig} component={Input} componentProps={{ value: 'Просто текст', placeholder: 'Введите текст...' }} ></AllInOneStory>
    </Story >
);