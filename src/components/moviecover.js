import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import WatchListBtn from './watchListBtn';
import Loader from './loader';

function MovieCover({ watchList, setWatchList }) {

  const [moviesCover, setMoviesCover] = useState([]);
  const [loader, setLoader] = useState(false);

  const API_KEY = '443a4596b85914edb9a1a8e80c7456c3';

  useEffect(() => {
    fetchMovies();

    //loader
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  async function fetchMovies() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`);
    const data = await response.json();
    console.log(data)
    setMoviesCover(data.results);
  }

  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => <ul>{dots}</ul>,
    customPaging: i => (
      <div className="custom-dot">
        <i className="fas fa-circle"></i>
      </div>
    ),
    responsive: [
      {
        breakpoint: 650,
        settings: {
          dots: false
        }
      }
    ],
  };

  return (
    <div >
      {
        loader ?
          <Loader />
          :
          <Slider {...settings}>
            {
              moviesCover.map(movie => (
                <div className="main-slider-cover" key={movie.id}>
                  <Link to={`/movie/${movie.id}`}>
                    <div className="slider-cover" style={{ backgroundImage: `linear-gradient(to right, #29323c 0%, #4855630c 100%), url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
                      <div className="slider-cover-detail">
                        <div className="atwl">
                          <CircularProgressbar
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
                        <div>
                          <h3>{movie.title}<span className="original-title">{movie.title !== movie.original_title ? `( ${movie.original_title} )` : ""}</span></h3>
                          <p className="release_date">{movie.release_date}</p>
                          <p className="overview">{movie.overview}</p>
                        </div>
                      </div>
                    </div >
                  </Link >
                  <div className="wlbtn">
                    <WatchListBtn watchList={watchList} setWatchList={setWatchList} movie={movie} />
                  </div>

                </div>

              ))
            }
          </Slider >
      }

    </div >
  );
}

export default MovieCover;
