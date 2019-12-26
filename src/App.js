import React, {Component} from "react";

import {googleTranslate} from "./utils/googleTranslate";
import {Form} from "./form/Form";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {translatedString: "", codeCounter: 0};
        this.codes = ["af", "am", "ar", "az", "be", "bg", "bn", "bs", "ca", "en"];

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTranslation = this.getTranslation.bind(this);
    }
    
    handleSubmit(text) {
        this.getTranslation(text);
    }

    getTranslation(text) {
        console.log(this.state.codeCounter);
        console.log(text);
        googleTranslate.translate(
            text,
            this.codes[this.state.codeCounter],
            function (err, translation) {
                this.setState((prevState, props) => ({
                    codeCounter: prevState.codeCounter + 1
                }));
                console.log(translation.translatedText);
                if (this.state.codeCounter < this.codes.length) {
                    this.getTranslation(translation.translatedText);
                }
                this.setState({translatedString: translation.translatedText});
            }.bind(this)
        );
    }

    render() {
        return (
            <div className="Aligner">
                <Form
                    translatedText={this.state.translatedString}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default App;
