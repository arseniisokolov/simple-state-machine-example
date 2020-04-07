import { Icons } from '../index';

export const getIconsSvgArray = () => {
    const arr = [];
    for (const key in Icons) {
        arr.push([Icons[key], key]);
    }
    return arr;
};

export const capitalizeString = str => str.charAt(0).toUpperCase() + str.slice(1);

export const generateBemCls = ({ block = '', elem = '', mods = {}, mix = '', asMix = false }) => {
    const blockOrElem = elem ? `${block}__${elem}` : block;
    const handledMods = [];

    const normalizeBooleanMods = (modName, value) => {
        if (typeof value === 'boolean')
            return value ? modName : undefined;
        return value;
    };

    for (const key in mods) {
        handledMods.push(normalizeBooleanMods(key, mods[key]));
    }

    return `${asMix ? '' : blockOrElem} ${handledMods.filter(Boolean).map(mod => `${blockOrElem}_${mod}`).join(' ')} ${mix}`.trim();
};

export const getGuid = () => {
    return Math.random().toString(16).slice(2);
};


export const handleClickOutside = (blockElem, onClickOutside) => {
    const handle = ({ target }) => {
        const hasClickedOutside = blockElem && !blockElem.contains(target);
        if (hasClickedOutside) {
            onClickOutside();
        }
    };
    document.addEventListener('mousedown', handle);
    return () => {
        document.removeEventListener('mousedown', handle);
    };
};

export const scrollListItemIntoView = (listItemElem, listContainerElem) => {
    if (!listItemElem || !listContainerElem) {
        return;
    }
    const isUnderBottom = (listItemElem.offsetTop + listItemElem.offsetHeight) > (listContainerElem.scrollTop + listContainerElem.offsetHeight);
    const isOverTop = listItemElem.offsetTop < listContainerElem.scrollTop;
    if (isUnderBottom) {
        listItemElem.scrollIntoView(false);
    }
    if (isOverTop) {
        listItemElem.scrollIntoView(true);
    }
};