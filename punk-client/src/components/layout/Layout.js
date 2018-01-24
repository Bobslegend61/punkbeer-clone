import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import Home from "../home/Home";
import Favourite from "../favoutite/Favourite";
import Beer from "../beer/Beer";
import "./Layout.css";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            beers: "",
            favouriteId: []
        }
    }

    componentDidMount() {
        fetch("https://api.punkapi.com/v2/beers").then(res => res.json()).then(data => this.setState({beers: data})).catch(err => console.log(err));
    }

    onFormSubmit(e) {
        console.log(this.state.search);
        e.preventDefault();
    }

    inputChanged(e) {
        this.setState({search: e.target.value})
    }

    addFavourite(id) {
        this.setState((prevState, props) => {
            let newFav = prevState.favouriteId;
            newFav.push(id);
            return {
                favouriteId: newFav
            }
        });
    }

    render() {
        return(
            <div className="container">
                <nav>
                    <div className="brand">
                        <h1>punk beer</h1>
                    </div>
                    <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/favourites">Favourites</Link>
                    </div>
                </nav>
                <div className="search">
                    <form onSubmit={this.onFormSubmit.bind(this)}>
                        <input type="search" placeholder="Search" onChange={this.inputChanged.bind(this)} value={this.state.search}/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                <Switch>
                    <Route exact path="/" render={() => <Home beers= {this.state.beers} favouriteId = {this.state.favouriteId} addFavourite = {this.addFavourite.bind(this)} />} />
                    <Route path="/favourites" render={() => <Favourite beers= {this.state.beers} favouriteId = {this.state.favouriteId} />}/>
                    <Route path="/beer/:id" render={() => <Beer />}/>
                </Switch>
            </div>
        )
    }
}

export default Layout;