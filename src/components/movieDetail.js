import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import MovieSlider from './movieSlider';
import ReactPlayer from 'react-player';
import Loader from './loader';

function MovieDetail({ match }) {

    const [movie, setMovie] = useState({
        genres: [],
    });
    const [movieTrailer, setMovieTrailer] = useState({});
    const [movieVideos, setMovieVideos] = useState([]);
    const [actors, setActors] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [url, setUrl] = useState("");
    const [loader, setLoader] = useState(false);


    const API_KEY = '443a4596b85914edb9a1a8e80c7456c3';

    useEffect(() => {
        fetchMovies();
        fetchMovieTrailer();
        fetchActors();
        fetchSimilarMovies();

        //loader
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1000);

    }, [match]);

    async function fetchMovies() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${API_KEY}`);
        const data = await response.json();

        setMovie(data);
    }

    async function fetchMovieTrailer() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/videos?api_key=${API_KEY}`);
        const data = await response.json();

        const trailer = data.results.filter((video) => {
            return video.type === "Trailer"
        });

        setMovieVideos(data.results);
        setUrl(data.results[0].key);
        setMovieTrailer(trailer[0]);
    }

    async function fetchActors() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/credits?api_key=${API_KEY}`);
        const data = await response.json();


        setActors(data.cast.slice(0, 6));
    }

    async function fetchSimilarMovies() {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${match.params.id}/similar?api_key=${API_KEY}`);
        const data = await response.json();

        setSimilarMovies(data.results);
    }

    function handleUrlUpdate(e) {
        const active = document.querySelector('.active');
        if (active) {
            active.classList.remove('active');
        }
        e.target.classList.add("active")
        setUrl(e.target.getAttribute("url"));
    }

    return (
        <>
            {
                loader ?
                    <Loader />
                    :
                    <div className="movie-detail">
                        <div className="movie-detail-actions">
                            <Link to="/" className="goback">
                                <div >
                                    <i className="fas fa-arrow-alt-circle-left"></i>
                                </div>
                            </Link>

                            <CircularProgressbar
                                className="circuralBar"
                                minValue="0"
                                maxValue="10"
                                value={movie.vote_average}
                                text={movie.vote_average === 0 ? "0" : movie.vote_average}
                                styles={buildStyles({
                                    strokeLinecap: 'round',
                                    textSize: '30px',
                                    pathColor: 'white',
                                    textColor: 'white',
                                    trailColor: '#485563',
                                })}
                            />
                        </div>
                        <div className="movie-detail-cover" style={{ backgroundImage: `linear-gradient(to right, #29323c 0%, #4855638c 100%), url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>


                            <div className="detail">

                                <span className="title">{movie.title}</span>
                                <span className="original-title">{movie.title === movie.original_title ? "" : movie.original_title}</span>
                                <div className="line"></div>
                                <span className="budget">
                                    <i className="fas fa-dollar-sign icon"></i>
                                    {movie.budget === 0 ? "Unknown" : movie.budget}
                                </span>
                                <span className="genres">
                                    <i className="fas fa-heart icon"></i>
                                    {
                                        movie.genres.map(genre => (
                                            <span key={genre.id} className="genre">{genre.name}</span>
                                        ))
                                    }
                                </span>
                                <span className="release_date">{movie.release_date}</span>
                                <span className="overview">{movie.overview}</span>
                            </div>

                            <svg className="triangle" viewBox="0 0 100 100" preserveAspectRatio="none" fill="#485563" >
                                <polygon points="100,0 0,100 100,100" />
                            </svg>
                        </div>

                        <div className="actors-container">
                            <h1>Actors</h1>
                            <div className="actors">
                                {
                                    actors.map(actor => (
                                        <div key={actor.id} className="actor">
                                            <div className="actor-image" style={{ backgroundImage: `url(http://image.tmdb.org/t/p/w185/${actor.profile_path})` }}></div>
                                            <div>
                                                <div className="actor-detail">
                                                    <span>Original Name</span>
                                                    <p>{actor.original_name}</p>
                                                </div>
                                                <div className="actor-detail">
                                                    <span>Character Name</span>
                                                    <p>{actor.character}</p>
                                                </div>
                                                <div className="actor-detail">
                                                    <span>Popularity</span>
                                                    <p>{actor.popularity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="player">
                            <div className='player-wrapper'>
                                <ReactPlayer
                                    className='react-player'
                                    url={`https://www.youtube.com/watch?v=${url}`}
                                />
                                <div className="player-btns">
                                    {
                                        movieVideos.map((video, index) => (
                                            <div key={video.id} url={video.key} className={`player-btn ${index === 0 ? 'active' : ''}`} onClick={(e) => { handleUrlUpdate(e) }}>
                                                <span>{video.type}</span> - {video.name}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <MovieSlider movies={similarMovies} title="Semilar Movies" />
                    </div >
            }
        </>
    );
}

export default MovieDetail;
