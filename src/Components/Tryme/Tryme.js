import CodeMirror from '@uiw/react-codemirror';
import React, { Component } from 'react';
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
            value: 'const a = (x) => {\n let y = 10 * x; \n return "hello"; \n} \n // Call this function on line bellow:'
        }
        changeValue = (code) => {
            alert(this.state.value);
            this.setState({value: "const a = (x) => {\n let y = 10 * x; \n return \"hello\"; \n} \n // Call this function on line bellow:\n a(2); // => evaluate to 20"});
        }
        onChange = (code) => {
            console.log(code.getValue());
            this.setState({value: code.getValue()});
        }
        render() {

        const style = {
            width: "55vw",
            height: "60vh",
            margin: "20vh 20vw"
        };

        return (
            <div style={{
                position: "absolute",
                top: 0,
                textAlign: "left",
                padding: "0",
                margin: "0", 
                width: "100%",
                height: "100vh", 
                background: "#343233"}} 
                className="appContainer" >

                <div style={style}>
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
                    <button type="button" onClick={this.changeValue}>Change value</button>
                </div>
            </div>
        );
    }
}
export default Codemirror;
