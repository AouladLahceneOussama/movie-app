import React,{useState} from 'react';
import WatchListItem from './watchlistitem';

function Nav({watchList,setWatchList}){

    const [height,setHeight] = useState(0);

    function toggleHeight(){
        if(height === 0)
            setHeight(400);
        else
            setHeight(0);
    }

    return(
        <div className="nav">

            <div className="main-nav">
                <div className="nav-logo">
                    <i className="fas fa-film"></i>
                    <span>Let's Watch</span>
                </div>
                <ul>
                    <li className="watch-list">
                        <i onClick={toggleHeight} className="fas fa-tv"></i>
                        {watchList.length === 0 ? 
                            "" 
                            :
                            <span className="watch-list-length">{watchList.length}</span>
                        }
                        <WatchListItem watchList={watchList} setWatchList={setWatchList} height={height}/>
                    </li>
                </ul>
            </div>

            <div className="sub-nav">
                <p>WATCH ALL KIND OF MOVIES FREE . ENJOY IT !</p>
            </div>
            
        </div>
    );
}

export default Nav;