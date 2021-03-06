import React, { Component } from 'react';

class PlayerBar extends Component {
    render() {
        return (
            <section className="player-bar">
                <section id="buttons">
                    <div>
                        <button id="previous" onClick={this.props.handlePrevClick}>
                            <span className="ion-md-skip-backward"></span>
                        </button>
                        <button id="play-pause" onClick={this.props.handleSongClick} >
                            <span className={this.props.isPlaying ? 'ion-md-pause' : 'ion-md-play'}></span>
                        </button>
                        <button id="next" onClick={this.props.handleNextClick}>
                            <span className="ion-md-skip-forward"></span>
                        </button>
                    </div>    
                </section>
                <section id="time-control">
                    <div className="start-time">0:00</div>
                        <input 
                        type="range" 
                        className="seek-bar" 
                        value={(this.props.currentTime / this.props.duration) || 0}
                        max="1"
                        min="0"
                        step="0.01" 
                        onChange={this.props.handleTimeChange}
                        />
                    <div className="total-time">{this.props.formatTime(this.props.duration)}</div>
                </section>
                <div id="time-now">{this.props.formatTime(this.props.currentTime)}</div>
                <section id="volume-control">
                    <input 
                    type="range"
                    orient="vertical"
                    className="seek-bar" 
                    value={this.props.volume || 0.5} 
                    max="1"
                    min="0"
                    step="0.1"
                    id="volume-slider"
                    onChange={this.props.handleVolumeChange}
                    />
                    <div className="icon ion-md-volume-low"></div>
                    <div className="icon ion-md-volume-high"></div>
                </section>
                <div id="volume-now">{this.props.volume}</div>
            </section>
        );
    }
}

export default PlayerBar;

