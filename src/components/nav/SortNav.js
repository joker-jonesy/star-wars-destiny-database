import React from 'react';
import SortTag from './SortTag';
import { useSelector } from "react-redux";

function SortNav(props) {

    const [show, updateShow] = React.useState(false);
    const [tags, updateTags] = React.useState([]);
    const style =useSelector(state=>state.style);
    const sorted =useSelector(state=>state.sorted);


    React.useEffect(() => {
        let check = false;
        let tagArray = [];


        for (let p in sorted) {

            if (sorted[p].toggle) {
                check = true;
                for(let x=0; x<sorted[p].val.length; x++){
                    let obj = {
                        prop:p,
                        val:""
                    };
                    if(p==='health'){
                        obj.val=sorted[p].val[x]+"H";
                    }else if(p==='points'){
                        obj.val=sorted[p].val[x]+"P";
                    }else if(p==='cost'){
                        obj.val=sorted[p].val[x]+"C";
                    }else{
                        obj.val=sorted[p].val[x];
                    }
                    tagArray.push(obj)
                }
            }



        }

        updateShow(check);
        updateTags(tagArray);
    },
[sorted]);

let shower;

if (show) {
    shower = {
        top: '80px',
        backgroundColor: style.bodyText
    }
} else {
    shower = {
        top: '-80px',
        backgroundColor: style.bodyText
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



export default SortNav;