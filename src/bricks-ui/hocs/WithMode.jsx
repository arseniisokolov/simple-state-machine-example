import React from 'react';

export const WithMode = (OriginalViewComponent, OriginalEditComponent) => props => {

    return props.isReadonly ?
        <OriginalViewComponent {...props} /> :
        <OriginalEditComponent {...props} />;
};