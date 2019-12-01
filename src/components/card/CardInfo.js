import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner, faExclamationCircle, faHeart} from '@fortawesome/free-solid-svg-icons';
import Side from './Side';


function CardInfo(props) {

    const [rst, setRst] = React.useState([

        {
            format: "trilogy",
            restricted: false,
            balance: "--",
            legal: false
        },
        {
            format: "standard",
            restricted: false,
            balance: "--",
            legal: false
        },
        {
            format: "infinite",
            restricted: false,
            balance: "--",
            legal: true
        }
    ]);

    const [rend, rendElement] = React.useState({
        rst: false,
        load: true,
        error: false
    });


    React.useEffect(() => {

        const abortController = new AbortController();
        const signal = abortController.signal;


        function handleStatusChange(status) {
            setRst(status);
        }


        fetch("https://swdestinydb.com/api/public/formats/", {signal: signal})
            .then(response => {
                return response.json();
            })
            .then((data) => {
                let formatSet = [];

                data.map((fm) => {

                    let format = {
                        name: fm.name,
                        restricted: false,
                        balance: "--",
                        legal: false
                    };

                    if (props.code in fm.data.balance) {
                        format.balance = fm.data.balance[props.code];
                    }

                    if (fm.data.restricted.includes(props.code)) {
                        format.restricted = true;
                    }

                    if (fm.data.sets.includes(props.crd.set_code)) {
                        format.legal = true;
                    }

                    rendElement({rst: true, load: false, error: false});


                    return formatSet.push(format);

                });

                handleStatusChange(formatSet);
            }).catch(() => rendElement({rst: false, load: false, error: true}))


        return function cleanup() {
            abortController.abort();
        };
    }, [props.code, props.crd.set_code]);

    let formats = rst.map((fm, idx) =>
        <div key={idx} className={"format"}>
            <h3>{fm.name}</h3>
            <h5 className={"restrict"}>{fm.restricted ? "Restricted" : null}</h5>
            <h3>{fm.balance}</h3>
            <h6 className={!fm.legal ? "restrict" : null}>{fm.legal ? "Playable" : "Unplayable"}</h6>
        </div>
    );


    return (
        <div className={"cardInfo"}>
            <h1>{props.crd.is_unique && "◆ "}{props.crd.name}</h1>
            {props.crd.health &&
            <h2><FontAwesomeIcon icon={faHeart} size={"lg"} style={{color: "red"}}/> {props.crd.health}</h2>}
            {props.crd.cost &&
            <h2 className={"cost"}><span className='icon icon-resource '></span> {props.crd.cost} </h2>}
            <h2>{props.crd.points && "Points:"}{props.crd.points}</h2>
            <h2>{props.crd.type_name}</h2>
            <div className={"subtypes"}>{props.crd.subtypes !== undefined && props.crd.subtypes.map((sb, idx) =>
                <h3 key={idx}>{sb.name}{idx !== (props.crd.subtypes.length - 1) && "-"}</h3>
            )}</div>
            <div className={"sides"}>{props.crd.sides !== undefined && props.crd.sides.map((sd, idx) =>
                <Side key={idx} sd={sd}/>
            )}</div>
            <div className={"formats"}>
                {rend.rst && formats}
            </div>
            <div>
                {rend.load && <FontAwesomeIcon icon={faSpinner} spin size={"lg"} style={{color: props.loadColor}}/>}
                {rend.error && <FontAwesomeIcon icon={faExclamationCircle} style={{color: "red"}} size={"6x"}/>}
            </div>
            <div className={"text"}>
                <h3 className={"errata"}>{props.crd.has_errata && "This card has an errata"}</h3>
                {props.crd.text !== null && <p dangerouslySetInnerHTML={{
                    __html: props.crd.text.replace("[special]", "<span class='icon" +
                        " icon-special '></span>").replace("([special])", "(<span class='icon" +
                        " icon-special '></span>)").replace("([indirect])", "(<span class='icon" +
                        " icon-indirect '></span>)").replace("([melee])", "(<span class='icon" +
                        " icon-melee '></span>)").replace("([ranged])", "(<span class='icon" +
                        " icon-ranged '></span>)").replace("([discard])", "(<span class='icon" +
                        " icon-discard '></span>)").replace("([focus])", "(<span class='icon" +
                        " icon-focus '></span>)").replace("([disrupt])", "(<span class='icon" +
                        " icon-disrupt '></span>)").replace("([shield])", "(<span class='icon" +
                        " icon-shield '></span>)").replace("([resource])", "(<span class='icon" +
                        " icon-resource '></span>)").replace("([blank])", "(<span class='icon" +
                        " icon-blank '></span>)").replace("([ranged] or [melee])", "(<span class='icon" +
                        " icon-ranged '></span> or <span class='icon" +
                        " icon-melee '></span>)").replace("([melee] or [ranged])", "(<span class='icon" +
                        " icon-ranged '></span> or <span class='icon" +
                        " icon-melee '></span>)").replace("([ranged] or [melee])", "(<span class='icon" +
                        " icon-ranged '></span> or <span class='icon" +
                        " icon-melee '></span>)").replace("([ranged], [melee] or [indirect])", "(<span class='icon" +
                        " icon-ranged '></span>, <span class='icon" +
                        " icon-melee '></span> or <span class='icon" +
                        " icon-indirect '></span>)").replace("([ranged], [melee], or [indirect])", "(<span class='icon" +
                        " icon-ranged '></span>, <span class='icon" +
                        " icon-melee '></span> or <span class='icon" +
                        " icon-indirect '></span>)").replace("[AW]", "<span class='icon" +
                        " icon-set-AW'></span>").replace("[WotF]", "<span class='icon" +
                        " icon-set-WotF'></span>").replace("[RIV]", "<span class='icon" +
                        " icon-set-RIV'></span>").replace("[SoR]", "<span class='icon" +
                        " icon-set-SoR'></span>").replace("[LEG]", "<span class='icon" +
                        " icon-set-LEG'></span>").replace("[EaW]", "<span class='icon" +
                        " icon-set-EaW'></span>").replace("[AtG]", "<span class='icon" +
                        " icon-set-AtG'></span>").replace("[CONV]", "<span class='icon" +
                        " icon-set-CONV'></span>").replace("[AoN]", "<span class='icon" +
                        " icon-set-AoN'></span>").replace("[SoH]", "<span class='icon" +
                        " icon-set-SoH'></span>")
                }} className={"effects"}></p>}

                <i>{props.crd.flavor !== null && props.crd.flavor.replace("<cite>", "-").replace("</cite>", "")}</i>

                <div className={"bottom"}>
                    <div className={"affl " + props.crd.affiliation_name}>{props.crd.affiliation_name}</div>

                    <div className={"rr " + props.crd.rarity_name}>{props.crd.rarity_name}</div>

                    <div className={"color"} style={{
                        backgroundColor: props.crd.faction_code,
                        color: (props.crd.faction_code==='blue'?'white':'black')
                    }}>
                        {props.crd.faction_code.toUpperCase()}
                    </div>
                    <div className={"setStuff"}><span
                        className={"icon icon-set-" + props.crd.set_code}></span>{props.crd.set_name}: {props.crd.position}
                    </div>
                </div>


            </div>


        </div>
    )
}

export default CardInfo