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

export const setSort = (prop, toggle, val) => {
    return {
        type: 'SET_SORT',
        prop: prop,
        toggle: toggle,
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