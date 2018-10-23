import React, {Component} from 'react';
import './Klastloader.css'

class Klastloader extends Component {
    render() {
        return(
            <div id="klastLoader">

                <div id="rot">
                    <div id="dot"></div>
                </div>
                <img alt="loader" src="/klast_log_2.svg" />
                <div id="rot2"></div>
                
            </div>
        );
    }
}

export default Klastloader;