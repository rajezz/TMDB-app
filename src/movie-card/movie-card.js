import React, { Component } from 'react'

export default class MovieCard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="movie-card">
                if (this.props.poster_path) {
                <img src={`https://image.tmdb.org/t/p/original${this.props.poster_path}?api_key=e06126d126e95840b8906163c9eecc91`}/>
            } else {
                <img src={`https://image.tmdb.org/t/p/original${this.props.poster_path}?api_key=e06126d126e95840b8906163c9eecc91`}/>
                }
            </div>
        )
    }
}
