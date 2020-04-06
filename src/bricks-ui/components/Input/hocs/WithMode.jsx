import React from 'react';

export const WithMode = OriginalComponent => props => {

    return props.isReadonly ?
        <OriginalComponent.view {...props} /> :
        <OriginalComponent.edit {...props} />;
};