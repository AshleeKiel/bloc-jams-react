import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <button className="nav-button"><Link to='/'id="landing-button">Home</Link></button>
            <div className="divider"/>
            <button className="nav-button"><Link to='/library'id="library-button">Library</Link></button>
          </nav>
          <h1 className="main-title">Bloc Jams</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
