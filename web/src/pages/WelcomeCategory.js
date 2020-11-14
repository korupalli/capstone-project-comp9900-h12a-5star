import React, { Component } from 'react';
import _ from 'lodash'
import { Container, Header,Grid} from 'semantic-ui-react';
import MovieTile from '../components/MovieTile';

export default class RecentReleased extends Component {

    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/homepage/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {

        var columnsCategory = null
        var category = null

        if (this.props.match.params.category === "RecentlyReleased"){
            if (this.state.items.now_playing) {
                category = "Recently Released Movies"
                    columnsCategory = _.times(12, (i) => (
                        <Grid.Row key={i}>{
                            _.times(4, (j) => (
                                <Grid.Column>
                                    <MovieTile 
                                        title={this.state.items.now_playing[i*4+j].title} 
                                        poster={this.state.items.now_playing[i*4+j].poster} 
                                        release={this.state.items.now_playing[i*4+j].release_date} 
                                        rating={this.state.items.now_playing[i*4+j].rating} 
                                        description={this.state.items.now_playing[i*4+j].description} 
                                        movieId={this.state.items.now_playing[i*4+j].id}
                                    />
                                </Grid.Column>
                            ))
                        }
                        </Grid.Row>
                    ))
                }
            }
        else if(this.props.match.params.category === "TopRated"){
            category = "Top Rated Movies"
            if (this.state.items.top_rated) {
                columnsCategory = _.times(12, (i) => (
                    <Grid.Row key={i}>{
                        _.times(4, (j) => (
                            <Grid.Column>
                                <MovieTile 
                                    title={this.state.items.top_rated[i*4+j].title} 
                                    poster={this.state.items.top_rated[i*4+j].poster} 
                                    release={this.state.items.top_rated[i*4+j].release_date} 
                                    rating={this.state.items.top_rated[i*4+j].rating} 
                                    description={this.state.items.top_rated[i*4+j].description} 
                                    movieId={this.state.items.top_rated[i*4+j].id}
                                />
                            </Grid.Column>
                        ))
                    }
                    </Grid.Row>
                ))
            }
        }
        else if (this.props.match.params.category === "TrendingNow"){
            if (this.state.items.now_playing) {
                category = "Trending Movies"
                columnsCategory = _.times(12, (i) => (
                    <Grid.Row key={i}>{
                        _.times(4, (j) => (
                            <Grid.Column>
                                <MovieTile 
                                    title={this.state.items.popular[i*4+j].title} 
                                    poster={this.state.items.popular[i*4+j].poster} 
                                    release={this.state.items.popular[i*4+j].release_date} 
                                    rating={this.state.items.popular[i*4+j].rating} 
                                    description={this.state.items.popular[i*4+j].description} 
                                    movieId={this.state.items.popular[i*4+j].id}
                                />
                            </Grid.Column>
                        ))
                    }
                    </Grid.Row>
                ))
            }
        }
        else if (this.props.match.params.category === "RecommendMore"){
            if (this.state.items.recomendations) {
                console.log("recommending")
                category = "Recommend More"
                columnsCategory = _.times(12, (i) => (
                    <Grid.Row key={i}>{
                        _.times(4, (j) => (
                            <Grid.Column>
                                <MovieTile 
                    title={this.state.items.recomendations[i*4+j].movieTitle} 
                    poster={this.state.items.recomendations[i*4+j].poster} 
                    release={this.state.items.recomendations[i*4+j].releaseDate} 
                    rating={this.state.items.recomendations[i*4+j].rating} 
                    description={this.state.items.recomendations[i*4+j].description} 
                    movieId={this.state.items.recomendations[i*4+j].movieID} 
                                />
                            </Grid.Column>
                        ))
                    }
                    </Grid.Row>
                ))
            }
        }
        
        return (
            <>
                <Container style={{ margin: 20 }}>
                    <Header as='h1'>{category}</Header>
                    <Grid columns='equal'>{columnsCategory}</Grid>
                </Container>
            </>
        )
    }

}