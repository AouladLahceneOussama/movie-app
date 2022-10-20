import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';

function WatchListItem({ watchList, setWatchList, height }) {

    function deleteFromWatchList(movie) {
        setWatchList(watchList.filter((wl) => wl.movie.id !== movie.id));
    }

    return (
        <div className="list" style={{ maxHeight: `${height}px` }}>
            {
                watchList.map((listItem) => (
                    <div key={listItem.movie.id} className="list-container">
                        <Link to={`/movie/${listItem.movie.id}`} className="list-item">
                            <img src={`http://image.tmdb.org/t/p/w200/${listItem.movie.poster_path}`} alt={listItem.movie.title} />
                            <div className="item-detail">
                                <CircularProgressbar
                                    className="vote"
                                    minValue="0"
                                    maxValue="10"
                                    value={listItem.movie.vote_average}
                                    text={listItem.movie.vote_average === 0 ? "0" : listItem.movie.vote_average}
                                    styles={buildStyles({
                                        strokeLinecap: 'round',
                                        textSize: '35px',
                                        pathColor: 'white',
                                        textColor: 'white',
                                        trailColor: '#29323c',
                                    })}
                                />
                                <div className="item-text">
                                    <span className="title">{listItem.movie.title}</span>
                                    <span className="info">
                                        <i className="fas fa-fire"></i>
                                        <span>{listItem.movie.popularity}</span>
                                    </span>
                                    <span className="info">
                                        <i className="fas fa-calendar-day"></i>
                                        <span>{listItem.movie.release_date}</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                        <i onClick={() => deleteFromWatchList(listItem.movie)} className="fas fa-trash-alt trash"></i>
                        <div className="line"></div>
                    </div>
                ))
            }
        </div>
    );
}

export default WatchListItem;