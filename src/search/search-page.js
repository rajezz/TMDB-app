import React, { Component } from "react";
import axios from "axios";
import "./search-page.css";

/* components */
import MovieCard from "../movie-card/movie-card";
import SelectComponent from "../components/select/select";

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      state: "",
      results: [],
      availableGenres: [],
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

  fetchGenres() {
    return new Promise((resolve, reject) => {
      if (this.state.availableGenres.length > 0) {
        resolve(this.state.availableGenres)
      } else {
        axios
        .get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=e06126d126e95840b8906163c9eecc91&language=en-US`
        )
        .then(
          (result) => {
            console.log(result);
            let genres = result.data.genres;
            this.setState({
              ...this.state,
              availableGenres: genres.map((genre) => {
                return {
                  label: genre.name,
                  value: genre.id,
                };
              }),
            }, () => {
              console.log(this.state)
              resolve(this.state.availableGenres)
            });
          },
          (error) => {
            console.log(error);
            reject()
          }
        );
        }
    })
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
        {<SelectComponent fetchResources={this.fetchGenres} />}

        <div className="results-panel">
          {this.state.results.forEach((element) => {
            <MovieCard detail={element} />;
          })}
        </div>
      </div>
    );
  }
}
