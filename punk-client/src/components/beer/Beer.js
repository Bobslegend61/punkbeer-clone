import React from "react";
import "./Beer.css";

const Beer = (props) => {
    let contentLoad;
    if(props.beers !== "") {
        let beer = props.beers.filter(beer => beer.id === Number(props.match.params.id));
        contentLoad = (
            <div>
                <h2>{ beer[0].name }</h2>
                <img src={beer[0].image_url} alt={beer[0].name} />
                <p><strong>Tagline:</strong> {beer[0].tagline}</p>
                <p><strong>First brewed:</strong> {beer[0].first_brewed}</p>
                <p>{beer[0].description}</p>
                <p>{beer[0].method.twist}</p>
                <p><strong>Brewer Tip:</strong> {beer[0].brewers_tips}</p>
                <p><strong>Contributed By:</strong> {beer[0].contributed_by}</p>
            </div>
        );
    }
    return (
        <div className="beer">
            {contentLoad ? contentLoad : ""}
        </div>
    )
}

export default Beer;