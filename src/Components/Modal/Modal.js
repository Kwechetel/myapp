import React, {Component} from 'react';
import './Modal.css';

class Modal extends Component{
    render() {
        return(
            <div className="ModalContainer">
                <div className="Modal">
                    <div className="modalCloseBtn">
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Modal;