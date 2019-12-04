import React from 'react';
import {changeLimit} from "../../redux/actions/setActions";
import Card from '../card/Card';
import {connect} from 'react-redux';
import Button from '../input/Button';
import {Link} from 'react-router-dom';

function List(props) {

    const [sort, setSort] = React.useState([]);
    const [load] = React.useState(true);
    const [error] = React.useState(false);


    React.useEffect(() => {


        function sortObject() {

            let sortedList = props.cards;

            for (let p in props.sorted) {


                if (props.sorted[p].toggle) {

                    if (p === "points") {


                        sortedList = sortedList.filter(crd => {
                            let ret = false;
                            if (crd.points !== null) {
                                let arrayPoints = crd.points.split("/");
                                for (let i = 0; i < props.sorted.points.val.length; i++) {
                                    for (let v = 0; v < arrayPoints.length; v++) {
                                        if (arrayPoints[v] === props.sorted.points.val[i]) {

                                            ret = true;
                                        }
                                    }
                                }
                            }
                            return (ret ? crd : null)

                        });


                    } else if (p === "sides") {

                        for (let i = 0; i < props.sorted.sides.val.length; i++) {

                            sortedList = sortedList.filter(crd => {
                                let ret = false;
                                if (crd.hasOwnProperty('sides')) {
                                    for (let v = 0; v < crd.sides.length; v++) {
                                        if (crd.sides[v].includes(props.sorted.sides.val[i])) {
                                            ret = true
                                        }
                                    }
                                }
                                return (ret ? crd : null)

                            });
                        }


                    } else if (p === 'formats') {
                        sortedList = sortedList.filter(crd => {
                            let ret = false;
                            for (let i = 0; i < props.formats.length; i++) {
                                for (let q = 0; q < props.sorted.formats.val.length; q++) {
                                    if (props.formats[i].name === props.sorted.formats.val[q] && props.formats[i].data.sets.includes(crd.set_code)) {
                                        ret = true;
                                    }
                                }
                            }
                            return (ret ? crd : null);
                        });
                    }else if (p === 'restricted') {
                        sortedList = sortedList.filter(crd => {
                            let ret = false;
                            for(let y=0; y<props.formats.length; y++){
                                for (let i = 0; i < props.formats[y].data.restricted.length; i++) {
                                    if(props.formats[y].data.restricted[i]===crd.code&&props.sorted.restricted.val.includes("restricted")){
                                        ret=true
                                    }
                                }
                            }

                            return (ret ? crd : null);
                        });
                    }else if (p === 'balanced') {
                        sortedList = sortedList.filter(crd => {
                            let ret = false;
                            for(let y=0; y<props.formats.length; y++){
                                for (let i in props.formats[y].data.balance) {
                                    if(i===crd.code&&props.sorted.balanced.val.includes("balanced")){
                                        ret=true
                                    }
                                }
                            }

                            return (ret ? crd : null);
                        });
                    }else if (p === 'keywords') {
                        sortedList = sortedList.filter(crd => {
                            let ret = false;
                            for(let i=0; i<props.sorted.keywords.val.length; i++){
                                if(crd.text!==null&&crd.text.includes(props.sorted.keywords.val[i])){
                                    ret=true;
                                }
                            }
                            return (ret ? crd : null);
                        });
                    } else {
                        sortedList = sortedList.filter(crd => {

                            return props.sorted[p].val.includes(crd[p])

                        });
                    }
                }
            }


            if (props.name !== '') {
                sortedList = sortedList.filter(crd => {
                    if (crd.name.includes(props.name)) {
                        return true
                    } else if (crd.name.toLowerCase().includes(props.name)) {
                        return true
                    } else return crd.name.toUpperCase().includes(props.name);
                });
            }


            setSort(sortedList)
        }

        sortObject();

        return () => {
            sortObject();
        }

    }, [load, props.name, props.sorted, props.cards, props.formats]);


    let cardEle;

    if (sort.length !== 0) {
        cardEle = sort.slice(0, props.itemLimit).map((crd, idx) =>


            <Link to={"/" + crd.code} key={idx} className={"cardFlop"}>

                <Card name={crd.name} bod={true} imagesrc={crd.imagesrc} code={crd.code}
                      loadColor={"#343740"}/>
            </Link>
        );
    } else if (!load && !error) {
        cardEle = <h1>No cards in search</h1>;
    } else if (load && !error) {
        cardEle = <h1>Fetching Cards...</h1>;
    } else if (load && error) {
        cardEle = <h1>Loading Cards failed. Refresh page...</h1>;
    }


    const button = () => {
        if (props.itemLimit < sort.length && sort.length > 10) {
            return <Button handleClick={() => props.changeLimit()} text={"Load More"}/>
        }
    };


    return (

        <div className={"list"}>
            <div className={"wrapper"}>
                {cardEle}
            </div>
            {button()}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        displayedSet: state.displayedSet,
        itemLimit: state.itemLimit,
        setLimit: state.setLimit,
        sorted: state.sorted,
        name: state.name,
        style: state.style,
        cards:state.cards,
        formats:state.formats
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLimit: () => {
            dispatch(changeLimit())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
