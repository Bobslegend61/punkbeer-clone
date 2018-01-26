import React from "react";
import "./Beer.css";

const Beer = (props) => {
    let contentLoad;
    if(props.beers !== "") {
        let beer = props.beers.filter(beer => beer.id === Number(props.match.params.id));
        contentLoad = (
            <div>{beer[0].name}</div>
        );
    }
    return (
        <div className="beer">
            {contentLoad ? contentLoad : ""}
        </div>
    )
}

export default Beer;