import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = (props) => {
    let contentLoad;
    if(props.beers !== "") {
        contentLoad = props.beers.map((beer) => {
            let favourite = props.favouriteId.indexOf(beer.id) !== -1 ? true : false;
            return (
                
                <div className="card" key={beer.id}>
                    <i className={`fa ${favourite ? "fa-heart" : "fa-heart-o"}`} onClick={() => props.addFavourite(beer.id)}></i>
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
        <div className="home">
            {contentLoad ? contentLoad : ""}
            <button type="button" onClick={ () => props.buttonClicked() }>Load More</button>
        </div>
    )
}

export default Home;