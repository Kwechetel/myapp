import CodeMirror from '@uiw/react-codemirror';
import React, { Component } from 'react';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
//import 'codemirror/keymap/sublime';
import './rubyblue.css';


class Codemirror extends Component {
        state = {
            value: 'Value '
        }
        changeValue = (code) => {
            alert(this.state.value);
            this.setState({value: "Values has been set"});
        }
        onChange = (code) => {
            console.log(code.getValue());
            this.setState({value: code.getValue()});
        }
        render() {

        const style = {
            width: "400px",
            height: "400px"
        };

        return (
            <div style={style}>
            <CodeMirror
                value={this.state.value}
                onChange={this.onChange}
                options={{
                theme: 'rubyblue',
                mode: 'javascript',
                fullScreen: true,
                tabSize: 1
                }}
            />
            <button type="button" onClick={this.changeValue}>Change value</button>
        </div>
        );
    }
}
export default Codemirror;
