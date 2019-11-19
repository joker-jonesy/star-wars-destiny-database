import React from 'react';
import {changeLimit} from "../../redux/actions/setActions";
import Card from '../card/Card';
import {connect} from 'react-redux';
import Button from '../input/Button';

function List(props) {

    const [cards, setCards] = React.useState([]);
    const [load, setLoad] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {

        function handleStatusChange(status) {
            setCards(status)
        }

        fetch("https://swdestinydb.com/api/public/cards/")
            .then(response => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setLoad(false);
                handleStatusChange(data);
            }).catch(function () {
                setError(true);
            })

    }, [cards, load]);


    function sortObject() {

        let sortedList = cards;

        for (let p in props.sorted) {
            if (props.sorted[p].toggle) {

                if (props.sorted.points.toggle) {
                    sortedList = sortedList.filter(crd => {
                        console.log(crd, props.sorted[p].val);

                        if (crd.points != null) {
                            return crd.points.includes(props.sorted[p].val)
                        } else {
                            return;
                        }
                    });

                } else {
                    sortedList = sortedList.filter(crd => {

                        return crd[p] === props.sorted[p].val

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
                } else if (crd.name.toUpperCase().includes(props.name)) {
                    return true
                } else {
                    return false
                }
            });
        }


        return sortedList
    }

    let cardEle;

    if (sortObject().length !== 0) {
        cardEle = sortObject().slice(0, props.itemLimit).map((crd, idx) =>


            <Card key={idx} name={crd.name} imagesrc={crd.imagesrc} code={crd.code} loadColor={"#343740"}/>
        );
    } else if(!load&&!error) {
        cardEle = <h1>No cards in search</h1>;
    }else if(load&&!error){
        cardEle = <h1>Fetching Cards...</h1>;
    }else if(load&&error){
        cardEle = <h1>Loading Cards failed. Refresh page...</h1>;
    }


    const button = () => {
        if (props.itemLimit < sortObject().length && sortObject().length > 10) {
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
        name: state.name
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
