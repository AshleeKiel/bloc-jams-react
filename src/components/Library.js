import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = { albums: albumData };
    }

    render () {
        return (
            <section className="library">
                {
                    this.state.albums.map( (album, index) =>
                        <Link to={`/album/${album.slug}`} key={index}>
                            <img src={album.albumCover} alt={album.title} className="album-image"/>
                                <div className="library-columns">
                                    <div className="library-album-info">
                                        <div>{album.title}</div><div>&nbsp;</div>
                                        <div> by {album.artist} </div><div>&nbsp;</div>
                                        <div> contains {album.songs.length} songs</div>
                                    </div>
                                </div>
                        </Link>
                    )
                }
            </section>
        );
    }
}

export default Library;