

const initState = {
    itemLimit: 10,
    sorted:{
        rarity_name: {toggle: false, val: "Starter"},
        affiliation_code: {toggle: false, val: "villain"},
        type_code: {toggle: false, val: "character"},
        faction_code: {toggle: false, val: "red"},
        set_name:{toggle:false,val:"Way of the Force"},
        health: {toggle: false, val: 10},
        cost: {toggle: false, val: 0},
        points: {toggle: false, val: "7"}
    },
    name: "",
    options:false


};

const rootReducer = (state = initState, action) => {

    if (action.type === 'INCREASE_LIMIT') {

        let val = state.itemLimit;

        val = val + 10;


        return {
            ...state,
            itemLimit: val
        }
    }

    if (action.type === 'SET_SORT') {
        return {
            ...state,
            itemLimit:10,
            sorted:{
                ...state.sorted,
                [action.prop]: {
                    toggle: action.toggle,
                    val: action.val
                }
            }

        }

    }

    if (action.type === 'RESET_LIMIT') {

        return {
            ...state,
            itemLimit: 10
        }
    }

    if(action.type === 'SET_NAME'){
        return{
            ...state,
            name:action.name
        }
    }

    if(action.type === 'TOGGLE_OPTIONS'){

        return{
            ...state,
            options:!state.options
        }
    }


    return state;
};


export default rootReducer;