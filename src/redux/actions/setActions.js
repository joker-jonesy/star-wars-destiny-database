export const changeLimit = () => {
    return {
        type: 'INCREASE_LIMIT'
    }
};

export const setName = (name) => {
    return {
        type: 'SET_NAME',
        name:name
    }
};

export const setSort = (prop, val) => {
    return {
        type: 'SET_SORT',
        prop: prop,
        val: val
    }
};

export const toggleOptions = () => {
    return {
        type: 'TOGGLE_OPTIONS'
    }
};

export const toggleStyles = () => {
    return {
        type: 'TOGGLE_STYLES'
    }
};

export const setStyles = (style) => {
    return {
        type: 'SET_STYLE',
        style:style

    }
};

export const clearOptions = () =>{
    return {
        type: 'CLEAR_OPTIONS'
    }
};

export const setCards = (cards) =>{
    return {
        type: 'SET_CARDS',
        cards:cards
    }
};

export const setFormats = (fmts) =>{
    return {
        type: 'SET_FORMATS',
        fmts:fmts
    }
};

export const setSets = (sts) =>{
    return {
        type: 'SET_SETS',
        sts:sts
    }
};