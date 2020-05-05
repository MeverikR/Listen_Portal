import React, { Component } from 'react';

import { httpClient } from './../httpClient';

class AudioPlayer extends Component {
    state = { 
        value: [
            'x1', 'x1.5', 'x2', 'x3', 'x4'
        ],
        displayHint: 'none'
    }

    showHint = (audio) => {
        this.setState({
            displayHint: 'block'
        })
        audio.src = ""      
        setTimeout(() => {
            this.setState({
                displayHint: 'none'
            })
        }, 2000) 
    }

    handleCheckIfAudioExist = () => {
        const audio = document.querySelector('#player')
        const callPlayer = document.querySelector('.btnPlay')
        if (callPlayer) {
            httpClient(process.env.REACT_APP_API_URL + `/listen?id=${document.querySelector('.fa.fa-window-minimize').id}`)
            this.setState({
                displayHint: 'none'
            })
        } else {
            this.showHint(audio)
            this.handleSetSpeed('x1')  
        }
    }
    handleSetSpeed = (value) => {   
        const audio = document.querySelector('#player')
        const callPlayer = document.querySelector('.btnPlay')    
        const speed = value.split('x')[1];
        const btnsSpeed = document.querySelectorAll('#playerBtnWrapper button');
            btnsSpeed.forEach((item) => {
                if (callPlayer) {
                    console.log(audio.src)
                    if (speed.toString() === item.innerHTML.split('x')[1].toString()) {
                        item.className = 'active'
                    } else {
                        item.className = ''
                    }
                } else {
                    this.showHint(audio)
                    console.log('object')
                    item.className = ''
                    item.style.pointerEvent = 'none'
                    btnsSpeed[0].className = 'active'
                }
            }) 
        document.getElementById("player").playbackRate = speed;      
    }
   
    getCoords = (elem) => { 
        var box = elem.getBoundingClientRect();
        return {
          top: box.top, 
          left: box.left
        };
    }

    handleMousedown = (e) => {    
        let playerWrapper = document.getElementById('playerWrapper');
        let coords = this.getCoords(playerWrapper);

        let shiftX = e.pageX - coords.left;
        let shiftY = e.pageY - coords.top;
        
        playerWrapper.style.position = 'fixed';
        document.body.appendChild(playerWrapper);
        moveAt(e);
      
        playerWrapper.style.zIndex = 100000002; // над другими элементами
      
        function moveAt(e) {
            playerWrapper.style.left = e.pageX - shiftX + 'px';
            playerWrapper.style.top = e.pageY - shiftY + 'px';
        }
      
        document.onmousemove = function(e) {
            moveAt(e);
            document.querySelector('#root').style.userSelect = 'none';
            const btns = document.querySelectorAll('#playerBtnWrapper button');
            btns.forEach(btn => {
                btn.style.userSelect = 'none';
            })       
        };
      
        playerWrapper.onmouseup = function() {
            document.onmousemove = null;
            playerWrapper.onmouseup = null;
        };
      
    }
      
    handleDragstart = () =>{
        return false;
    };

    handleMousedownBtn = (e) => {
        e.stopPropagation()
    }

    handleClosePlayer = () => {
        document.getElementById('playerWrapper').style.display = 'none';
        document.getElementById('player').pause();
        const btns = document.querySelectorAll('.btnPlay i');
        btns.forEach(item => {
        if (item.className === 'fa fa-window-minimize fa-lg') {
            item.className = 'fa fa-play fa-lg';
        }
    })
    }

    render() {

        return ( 
            <React.Fragment>
                
                <div 
                    id="playerWrapper"
                    onMouseDown = {this.handleMousedown}
                    onDragStart = {this.handleDragstart}
                    style = {{display: 'none', position: 'fixed', top: '20px', left: '400px'}}
                >
                    <audio controls="controls" id="player"
                           src={this.props.src} controlsList="download"
                           onPlay={this.handleCheckIfAudioExist}
                    >
                    </audio>
                    <div id="playerBtnWrapper">{
                        this.state.value.map((speed, index) =>
                            (<button 
                                key={speed} 
                                onClick={()=>this.handleSetSpeed(speed)}                                
                                onMouseDown={this.handleMousedownBtn}>{speed}</button>)
                        )}
                                              
                        <button onClick={this.handleClosePlayer}                         
                                onMouseDown={this.handleMousedownBtn}
                                id="playerCloseBtn">
                                <i className="fa fa-times fa-lg" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div style={{display: this.state.displayHint, width: '100%', fontWeight: 'bold', margin: '20px 0 10px'}}>Выберите запись</div>
                </div>     
            </React.Fragment>
         );
    }
}
 
export default AudioPlayer;