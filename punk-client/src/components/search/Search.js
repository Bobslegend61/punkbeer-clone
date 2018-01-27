import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedBeers: ""
        }
    }

    componentWillMount() {
        fetch(`https://api.punkapi.com/v2/beers?beer_name=${this.props.searchTerm}`).then(res => res.json()).then(data => {this.setState({searchedBeers: data}); console.log(this.state.searchedBeers)}).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="search-page">
                {this.state.searchedBeers === "" ? "" : this.state.searchedBeers.map(beer => {
                    return (
                        <div className="card" key={beer.id}>
                            <div className="image">
                                <img src={beer["image_url"]} alt={beer.name} />
                            </div>
                            <div className="content">
                                <h2>{beer.name}</h2>
                                    <small>{beer.tagline}</small>
                                <div className="description">{beer.description}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Search;
    