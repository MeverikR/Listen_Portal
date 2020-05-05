import PropTypes from "prop-types";
import React, {Component} from "react";
import 'font-awesome/css/font-awesome.css';

let btnClass = "fa fa-play fa-lg";
class PlayerField extends Component {

  handlePlayer = (record) => {
    document.getElementById('playerWrapper').style.display = 'block';
    const btns = document.querySelectorAll('.btnPlay i');
    btns.forEach(item => {          
        if (item.className === 'fa fa-window-minimize fa-lg' && item.id !== `_id`+record.communication_id) {
            item.className = 'fa fa-play fa-lg';
        }
        const btnsSpeed = document.querySelectorAll('#playerBtnWrapper button');
        if (item.id === `_id`+record.communication_id && item.className === 'fa fa-play fa-lg') {
            item.className = 'fa fa-window-minimize fa-lg';
            document.getElementById('player').src = this.prepareLink(record);
            document.getElementById('player').play();
            
            
        } else if (item.id === `_id`+record.communication_id && item.className === 'fa fa-window-minimize fa-lg') {
            item.className = 'fa fa-play fa-lg';
            document.getElementById('player').src = '';
        }

        btnsSpeed.forEach((item, index) => {
            if (index === 0 && item.className !== 'active') {
                item.className = 'active'
            } else if (index !== 0 && item.className === 'active') {
                item.className = ''
            }
        })
    })
  }

    prepareLink = (record) => {
        const base_url = 'https://app.comagic.ru/system/media/talk/';
    
        if (!record.hasOwnProperty('call_records')){
            return false;
        }
    
        if (typeof record.call_records === 'undefined'){
            return false;
        }
    
        if (record.call_records.length <= 0){
            return false;
        }
    
        try {
            return base_url + record.communication_id  + '/' + record.call_records[0]+ '/'
        } catch (e) {
            return false;
        }    
    }

    render() { 
        const { record } = this.props;
        return ( 
            <span>{ this.prepareLink(record) ? 
                <button className="btnPlay"
                    style={{width: '30px', height: '30px', borderRadius: '50%', border: 'none', cursor: 'pointer'}} 
                    onClick={() => this.handlePlayer(record)}>
                        <i className={btnClass} id={`_id`+record.communication_id} aria-hidden="true"></i>
                </button>
                : '---' }
            </span>
         );
    }
}
 
export default PlayerField;

PlayerField.propTypes = {
    label: PropTypes.string,
    record: PropTypes.object,
    source: PropTypes.string.isRequired,
};
