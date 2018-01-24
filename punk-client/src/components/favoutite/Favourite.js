import React from "react";
import { Link } from "react-router-dom";
import "./Favourite.css";

const Favourite = (props) => {
    let contentLoad;
    if(props.beers !== "") {
        let favourite = props.beers.filter(beer => (props.favouriteId.indexOf(beer.id) !== -1));
        contentLoad = favourite.length === 0 ? "No don't have any favoutite item on you list." : favourite.map((beer) => {
            return (
                <div className="card" key={beer.id}>
                    <i className={`fa fa-heart`}></i>
                    <div className="image">
                        <img src={beer["image_url"]} alt={beer.name} />
                    </div>
                    <div className="content">
                        <h2>{beer.name}</h2>
                        <Link to={`/beer/${beer.id}`}>
                            <small>{beer.tagline}</small>
                        </Link>
                        <div className="description">{beer.description}</div>
                    </div>
                </div>
            )
        });
    }
    return (
        <div className="favourite">
            {contentLoad ? contentLoad : ""}
        </div>
    )
}

export default Favourite;