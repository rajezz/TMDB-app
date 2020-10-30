import React, { Component } from "react";
import axios from "axios";
import "./search-page.css";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      state: "",
      results: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    if (event.target.value.length > 2) {
      this.setState({ query: event.target.value }, () => {
        console.log(this.state);
        axios
          .get(
            `https://api.themoviedb.org/3/search/movie?api_key=e06126d126e95840b8906163c9eecc91&language=en-US&query=${this.state.query}&page=1&include_adult=true`
          )
          .then(
            (response) => {
              console.log(response);
            },
            (error) => console.log(error)
          );
      });
    } else {
      this.setState({ query: event.target.value });
    }
  }
  render() {
    return (
      <div className="page">
        <input
          className="search-input-field"
          type="text"
          id="search"
          onChange={this.onInputChange}
        />
        <div className="results-panel">
            {this.state.results.forEach(element => {
                <MovieCard
                    detail={element}
                />
            })}
        </div>
      </div>
    );
  }
}
