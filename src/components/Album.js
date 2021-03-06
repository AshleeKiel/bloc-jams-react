import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find( album => {
            return album.slug === this.props.match.params.slug
        });

        this.state = { 
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            duration: album.songs[0].duration,
            volume: 0.5,
            isPlaying: false,
            isHovered: false
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }
 
    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime} );
            },
            durationchange: e => { 
                this.setState({ duration: this.audioElement.duration });
            }, 
            volumeupdate: e => {
                this.setState({ volume: this.audioElement.volume });
            }
    };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
    }


    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
        this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
    } 

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.min(4, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({ volume: newVolume });
    }

    handleMouseEnter(song) {
        this.setState( {isHovered : song} );
    }

    handleMouseLeave() {
        this.setState( {isHovered : false} );
    } 

    hoverIcon(song, index) {
        if (this.state.isPlaying && song === this.state.currentSong) {
            return <span className="icon ion-md-pause"></span>;
        }
        else if (song === this.state.isHovered) {
            return <span className="icon ion-md-play"></span>;
        }
        else return <span>{index+1}</span>;
    }

    formatTime(time) {
        const minutes = (Math.floor(time / 60));
        const seconds = (Math.floor(time % 60));
        if (seconds < 10) {
            return (minutes + ":0" + seconds);
        }
        else if (time) {
            return (minutes + ":" + seconds);
        }
        else {
            return "-:--";
        }
    }

    render() {
        return (
            <section className="album">
                <PlayerBar 
                    isPlaying={this.state.isPlaying} 
                    currentSong={this.state.currentSong}
                    currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration}
                    volume={this.audioElement.volume}
                    handleSongClick={() => this.handleSongClick(this.state.currentSong)} 
                    handlePrevClick={() => this.handlePrevClick()}
                    handleNextClick={() => this.handleNextClick()}
                    handleTimeChange={(e) => this.handleTimeChange(e)}
                    handleVolumeChange={(e) => this.handleVolumeChange(e)}
                    formatTime={ (e) => this.formatTime(e)}
                />

                <div className="album-column">
                    <div className="album-row">
                        <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
                            <div id="album-details">
                                <h3> Album: {this.state.album.title} </h3>
                                <h3> Artist: {this.state.album.artist} </h3>
                                <p> Release Information: {this.state.album.releaseInfo}</p>
                            </div>
                
                        <table id="song-list">
                            <colgroup id="songlist-columns">
                                <col id="song-number-column"/>
                                <col id="song-title-column" />
                                <col id="song-duration-column" />
                            </colgroup>
                            <tbody>
                                {this.state.album.songs.map( (song, index) => 
                                    <tr className="song" key={index} 
                                        onMouseEnter={() => this.handleMouseEnter(song)}
                                        onMouseLeave={() => this.handleMouseLeave()}
                                        onClick={() => this.handleSongClick(song)} >
                                        <td>{this.hoverIcon(song, index)}</td> 
                                        <td className="song-title">{song.title}</td>
                                        <td className="song-duration">{this.formatTime(song.duration)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        );
    }   
}

export default Album;