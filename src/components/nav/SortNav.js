import React from 'react';
import SortTag from './SortTag';
import {connect} from 'react-redux';
import { useSelector } from "react-redux";

function SortNav(props) {

    const [show, updateShow] = React.useState(false);
    const [tags, updateTags] = React.useState([]);


    React.useEffect(() => {
        let check = false;
        let tagArray = [];


        for (let p in props.sorted) {

            if (props.sorted[p].toggle) {
                check = true;
                for(let x=0; x<props.sorted[p].val.length; x++){
                    let obj = {
                        prop:p,
                        val:""
                    };
                    if(p==='health'){
                        obj.val=props.sorted[p].val[x]+"H";
                    }else if(p==='points'){
                        obj.val=props.sorted[p].val[x]+"P";
                    }else if(p==='cost'){
                        obj.val=props.sorted[p].val[x]+"C";
                    }else{
                        obj.val=props.sorted[p].val[x];
                    }
                    tagArray.push(obj)
                }
            }



        }

        updateShow(check);
        updateTags(tagArray);
    },
[props.sorted]);

let shower;

if (show) {
    shower = {
        top: '80px',
        backgroundColor: props.style.bodyText
    }
} else {
    shower = {
        top: '-80px',
        backgroundColor: props.style.bodyText
    }
}


let tagEles = tags.map((st, idx) =>
    <SortTag key={idx} val={st.val} prp={st.prop}/>
);

return (
    <div className={"sortNav"} style={shower}>
        {tagEles}
    </div>
)
}

const mapStateToProps = (state) => {
    return {
        sorted: state.sorted,
        style: state.style
    }
};

export default connect(mapStateToProps)(SortNav);