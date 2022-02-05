import React,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Switch ,Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import MainContent from './components/mainContent';
import MovieDetail from './components/movieDetail';

function App() {

  const [watchList,setWatchList] = useState([]);
  
  useEffect(() => {
        getWatchListLocal();
  }, []);

  function getWatchListLocal(){
      if (localStorage.getItem('watchList') !== null) {
          setWatchList(JSON.parse(localStorage.getItem('watchList')));
      }
  }

  return (
      <div className="App">
          <Router>
          <Nav watchList={watchList} setWatchList={setWatchList} />
            <Switch>
              <Route path="/movie/:id" component={MovieDetail} />
              <MainContent watchList={watchList} setWatchList={setWatchList} />
            </Switch>
          </Router>
      </div>
  );
}

export default App;
