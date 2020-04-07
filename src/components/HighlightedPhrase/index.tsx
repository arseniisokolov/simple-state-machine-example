import React from 'react';
import { HighlightedPhrasePropsType } from '../types';

export const HighlightedPhrase: React.FC<HighlightedPhrasePropsType> = ({ phrase }) => {
    return (
        <span className='article__highlighted-phrase'>{phrase}</span>
    );
};
