const initState = {
    itemLimit: 10,
    sorted:{
        rarity_name: {toggle: false, val: []},
        affiliation_code: {toggle: false, val: []},
        type_code: {toggle: false, val: []},
        faction_code: {toggle: false, val: []},
        set_name:{toggle:false,val:[]},
        health: {toggle: false, val: []},
        cost: {toggle: false, val: []},
        points: {toggle: false, val: []},
        sides:{toggle: false, val:[]},
        formats:{toggle:false, val:[]},
        restricted:{toggle:false,val:[]},
        balanced:{toggle:false,val:[]},
        keywords:{toggle:false,val:[]}
    },
    style:JSON.parse(localStorage.getItem('localStyle')) || '',
    name: "",
    options:false,
    styles:false


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

        let orgArray = state.sorted[action.prop].val;

        if(orgArray.includes(action.val)){
            let ind = orgArray.indexOf(action.val);
            orgArray.splice(ind,1);

        }else{
            orgArray.push(action.val)
        }

        let togg = orgArray.length > 0;

        return {
            ...state,
            itemLimit:10,
            sorted:{
                ...state.sorted,
                [action.prop]: {
                    toggle: togg,
                    val: orgArray
                }
            }

        }

    }

    if(action.type === 'SET_NAME'){
        return{
            ...state,
            name:action.name
        }
    }

    if(action.type === 'SET_STYLE'){

        document.documentElement.style.backgroundColor=action.style.body;

        return{
            ...state,
            style:action.style
        }
    }

    if(action.type === 'TOGGLE_OPTIONS'){

        return{
            ...state,
            options:!state.options,
            styles:false
        }
    }

    if(action.type === 'TOGGLE_STYLES'){


        return{
            ...state,
            styles:!state.styles,
            options:false
        }
    }

    if(action.type === 'CLEAR_OPTIONS'){

        return{
            ...state,
            itemLimit: 10,
            sorted:{
                rarity_name: {toggle: false, val: []},
                affiliation_code: {toggle: false, val: []},
                type_code: {toggle: false, val: []},
                faction_code: {toggle: false, val: []},
                set_name:{toggle:false,val:[]},
                health: {toggle: false, val: []},
                cost: {toggle: false, val: []},
                points: {toggle: false, val: []},
                sides:{toggle: false, val:[]},
                formats:{toggle:false, val:[]},
                restricted:{toggle:false,val:[]},
                balanced:{toggle:false,val:[]},
                keywords:{toggle:false,val:[]}
            },
            name: "",
            options:false,
            styles:false
        }
    }


    return state;
};


export default rootReducer;