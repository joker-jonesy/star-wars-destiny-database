import React from 'react';
import {changeLimit} from "../../redux/actions/setActions";
import Card from '../card/Card';
import {connect} from 'react-redux';
import Button from '../input/Button';
import {Link} from 'react-router-dom';

function List(props) {

    const [cards, setCards] = React.useState([]);
    const [sort, setSort] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const [error, setError] = React.useState(false);



    React.useEffect(() => {

        function handleStatusChange(status) {
            setCards(status)
        }

        if (load) {
            fetch("https://swdestinydb.com/api/public/cards/")
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    setLoad(false);
                    handleStatusChange(data);
                }).catch(function () {
                setError(true);
            });
        }

        function sortObject() {

            let sortedList = cards;

            for (let p in props.sorted) {


                if (props.sorted[p].toggle) {

                    if (p === "points") {

                        for (let i = 0; i < props.sorted.points.val.length; i++) {
                            sortedList = sortedList.filter(crd => {

                                return (crd.points !== null && crd.points.split("/").includes("" + props.sorted.points.val[i] + "")) ? crd : null
                            });
                        }


                    } else if (p === "sides") {

                        for (let i = 0; i < props.sorted.sides.val.length; i++) {

                            sortedList = sortedList.filter(crd => {
                                let ret =false;
                                if (crd.hasOwnProperty('sides')) {
                                    for (let v = 0; v < crd.sides.length; v++) {
                                        if(crd.sides[v].includes(props.sorted.sides.val[i])){
                                           ret=true
                                        }
                                    }
                                }
                                return (ret ? crd : null)

                            });
                        }


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

        return ()=>{
            sortObject();
        }

    }, [cards, load, props.name, props.sorted]);


    let cardEle;

    if (sort.length !== 0) {
        cardEle = sort.slice(0, props.itemLimit).map((crd, idx) =>


            <Link to={"/" + crd.code} key={idx}>

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
        style: state.style
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
