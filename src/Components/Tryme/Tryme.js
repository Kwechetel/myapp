import CodeMirror from '@uiw/react-codemirror';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import axios from 'axios';
import queryString from 'query-string';

import './Tryme.css';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/edit/closebrackets';
import './scroll/simplescrollbars.css';
import 'codemirror/addon/edit/matchbrackets';
import './Theme/rubyblue.css';
import 'codemirror/theme/monokai.css';


class Codemirror extends Component {
    state = {
        value: 'const a = (x) => {\n let y = 10 * x; \n return "hello"; \n} \n // Call this function on line bellow:',
        testnum: 0
    }
    
    test = [
        {value: "test 1"},
        {value: "test 2"},
        {value: "test 3"},
        {value: "test 4"}
    ]

    changeValue = (code) => {
        
        //this.setState({value: "const a = (x) => {\n let y = 10 * x; \n return \"hello\"; \n} \n // Call this function on line bellow:\n\n a(2); // => evaluate to 20"});
    }
    onChange = (code) => {
        this.setState({value: code.getValue()});
    }

    onClickNext = () => {
        const testRange = (this.test.length - 1);

        let x = this.state.testnum >= testRange ? testRange -1 : this.state.testnum;
        this.setState({testnum: x + 1});
        
        this.setState({value: this.test[this.state.testnum].value});

    }

    handleKeyUp = (e) => {
        localStorage.setItem("tryme", JSON.stringify({value: this.state.value, testnum: this.state.testnum}));
    }

    onClickRest = () => {
        localStorage.removeItem('tryme');
        window.location.reload();
    }

    getLocalStorage = () => {
        const stateStatus = JSON.parse(localStorage.getItem('tryme'));

        return localStorage.getItem('tryme') == null ? true : this.setState({value: stateStatus.value, testnum: stateStatus.testnum});
    }
    

    componentDidMount() {
        this.getLocalStorage();
    }

    consoleLoger = () => {

            let logger = document.querySelector("#appConsole");

            logger.contentWindow.location.reload();

            const qs = queryString;
        
            axios.post("http://server.klast.academy/console/tryme.php", qs.stringify({codes: this.state.value}))
            .then(res => {
                const response = res.data;

                console.log(response);

                var myIframe = logger,
                iframeWindow = myIframe.contentWindow || myIframe,
                iframeDocument = myIframe.contentDocument || iframeWindow.document;

                iframeDocument.open();
                iframeDocument.write(response);
                iframeDocument.close();
                
            })
        
    }

    clearConsole = () => {
        let logger = document.querySelector("#appConsole");

        logger.contentWindow.location.reload();
    }

    resizeIframe = (e) => {

        let logg = document.querySelector("#appConsole").contentWindow;
        document.querySelector("#appConsole").style.height = logg.document.body.offsetHeight + "px";
        
      }


    render() {
            
        return (
            <div id="tryme" className="appContainer" >

                <div className="row" style={{padding: "10vh 25vw"}}>

                    <div id="trmeCont" className="col-4 " style={{height: "60vh"}}>
                    <Scrollbars style={{ width: "100%", height: "60vh"}}>
                        <div style={{height: "100vh"}}>
                            
                            
                        </div>

                    </Scrollbars>

                    </div>

                    <div className="col-8 codeApp" style={{height: "60vh"}} onKeyUp={this.handleKeyUp} >
                        <div style={{background: "#181E27", height: "60vh"}}>
                        <CodeMirror
                            value={this.state.value}
                            onChange={this.onChange}
                            options={{
                            theme: 'rubyblue',
                            mode: 'javascript',
                            fullScreen: true,
                            scrollbarStyle: "simple",
                            autoCloseBrackets: true,
                            tabSize: 1
                            }}
                        />
                        </div>
                        <div id="runConsoleContainer">
                            <div style={{width: "10%", fontSize: "3vh", color: "white", textAlign: "center", padding: "1vh"}}>../</div>
                            
                            <iframe height="100" frameBorder="0" scrolling="no"  onLoad={this.resizeIframe} id="appConsole" title="console" style={{width: "89.999%"}}>
                            </iframe>
                            
                        </div>
                        <button className="funcBtn" type="button" onClick={this.consoleLoger }>Run ../</button>
                        <button className="funcBtn" type="button" onClick={this.clearConsole }>Clear Console() ../</button>
                        <button className="funcBtn" style={{margin: "0 0.3vw"}} onClick={this.onClickRest}>Restart</button>
                        
                        <button className="funcBtn pull-right" style={{margin: "0"}} onClick={this.onClickNext}>Continue</button>

                    </div>
                </div>
             </div>
        );
    }
}
export default Codemirror;
