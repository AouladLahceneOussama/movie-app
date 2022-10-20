import React from 'react';
import Slider from "react-slick";
import {Link} from 'react-router-dom'; 

function MovieSlider({movies,title}) {

    var settings = {
        arrows:false,
        infinite: true,
        autoplay:true,
        variableWidth: true,
        autoplaySpeed:2000,
        speed: 500,
        slidesToScroll: 1,
      };

    return (
        <div className="topRated-slider">
            <h1 className="slider-title">{title}</h1>
            <Slider {...settings} >
            {
                movies.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>    
                        <div className="slider-item">
                            <img src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                            <div className="item-detail">
                                <div className="item-vote">
                                    <p>{movie.vote_average.toFixed(2)}</p>
                                </div>
                                <div className="item-desc">
                                  <h5>{movie.title}</h5>
                                    <p>{movie.overview}</p> 
                                </div>
                            </div>
                        </div>
                    </Link>    
                ))
            }
            </Slider>
        </div>
    );
}

export default MovieSlider;