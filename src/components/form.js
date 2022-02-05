import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

function Form({setYear,setCategory}){

    const [movieSearch, setMovieSearch] = useState([]);    
    const [query, setQuery] = useState("");    
    const [yearArray,setYearArray] = useState([]);
    const API_KEY = '443a4596b85914edb9a1a8e80c7456c3';

    useEffect( () => {
        addYears();
    }, []);

    useEffect( () => {
        getMoviesByQuery();
    }, [query]);
    
    async function getMoviesByQuery(){
        if(query.length >= 2){
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`); 
            const data = await response.json();
            setMovieSearch(data.results);
        }
        else
            setMovieSearch([]);
    }

    function updateQuery(e){
        setQuery(e.target.value);
    }

    function addYears(){
        var thisYear = new Date().getFullYear();
        var years = [];

        for(var i = thisYear ; i >= 2000 ; i--){
            years.push(i);
        }
        setYearArray(years);
    }

    return(
        <div className="search">

            <div className="search-bar">
                <input type="text" id="search" value={query} onChange={updateQuery}/>
                <i className="fas fa-search"></i>
                <div className="search-list">
                    {
                        movieSearch.map( movie => (
                            <div key={movie.id} className="search-item">
                                <img src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                                <div className="search-detail">
                                    <Link to={`/movie/${movie.id}`}>
                                        <p className="title">{movie.title}</p>
                                    </Link>
                                    <p className="overview">{movie.overview.substring(0,100)}</p> 
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="search-select">
                <div className="select">
                    <select onChange={ (e) => {setCategory(e.target.value)} }>
                        <option value="popular">Popular</option>
                        <option value="upcoming">Upcomming</option>
                        <option value="top_rated">TopRated</option>
                        <option value="now_playing">Now Playing</option>
                    </select>
                    <i className="fas fa-box"></i>
                </div>
                
                <div className="select">
                    <select onChange={ (e) => {setYear(e.target.value)} }>                        
                        {yearArray.map( year => (
                            <option key={Math.random() * 1000} value={year}>{year}</option>
                        ))}
                    </select>
                    <i className="fas fa-calendar-day"></i>
                </div>

            </div>
            
        </div>
    );
}

export default Form;