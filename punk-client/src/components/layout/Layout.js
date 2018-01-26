import React, { Component } from "react";
import { Switch, Link, Route } from "react-router-dom";
import Home from "../home/Home";
import Favourite from "../favoutite/Favourite";
import Beer from "../beer/Beer";
import Search from "../search/Search";
import "./Layout.css";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            beers: "",
            favouriteId: [],
            page: 1
        }
    }

    componentDidMount() {
        fetch(`https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=40`).then(res => res.json()).then(data => this.setState({beers: data})).catch(err => console.log(err));
        window.addEventListener("scroll", (e) => {
            // console.log(e);
        })
    }

    onFormSubmit(e) {
        if(this.state.search.trim() === ""){
            alert("Please field is required");
            return false;
        }
        e.preventDefault();
    }

    inputChanged(e) {
        this.setState({search: e.target.value})
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.page !== this.state.page) {
            fetch(`https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=40`).then(res => res.json()).then(newBeers => this.setState((prevState, props) => {
                let oldBeers = this.state.beers;
                let joinedBeer = oldBeers.concat(newBeers);
                return {
                    beers: joinedBeer
                }
            })).catch(err => console.log(err));
        }
    }

    buttonClicked() {
        this.setState((prevState, props) => {
            return {
                page: prevState.page + 1
            }
        });
    }

    addFavourite(id) {
        this.setState((prevState, props) => {
            let newFav = prevState.favouriteId;
            if(newFav.indexOf(id) === -1) {
                newFav.push(id);
            }else {
                newFav.splice(newFav.indexOf(id), 1);
            }
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
                    <Route exact path="/" render={() => <Home buttonClicked={ this.buttonClicked.bind(this) } beers= {this.state.beers} favouriteId = {this.state.favouriteId} addFavourite = {this.addFavourite.bind(this)} />} />
                    <Route path="/favourites" render={() => <Favourite beers= {this.state.beers} favouriteId = {this.state.favouriteId} addFavourite = {this.addFavourite.bind(this)}/>}/>
                    <Route path="/beer/:id" render={(props) => <Beer {...props} beers= {this.state.beers} />}/>
                    <Route path="/search" render= {(props) => <Search {...props} searchTerm={this.state.search} />}/>
                </Switch>
            </div>
        )
    }
}

export default Layout;