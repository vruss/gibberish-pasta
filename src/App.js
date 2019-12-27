import React, {Component} from "react";
import {googleTranslate} from "./utils/googleTranslate";
import {Form} from "./form/Form";
import "./App.css";
import ReCAPTCHA from "react-google-recaptcha";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {translatedString: ""};

        this.codeCounter = 0;
        this.codes = ["en", "af", "am", "ar", "az", "be", "bg", "bn", "bs", "ca", "en"];

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTranslation = this.getTranslation.bind(this);
    }

    handleSubmit(text) {
        this.getTranslation(text);
    }


    onChange(value) {
        console.log("Captcha value:", value);
    }

    getTranslation(text) {
        console.log(this.codeCounter);
        console.log(text);
        googleTranslate.translate(
            text,
            this.codes[this.codeCounter],
            this.codes[this.codeCounter + 1],
            function (err, translation) {
                this.codeCounter++;
                console.log(translation.translatedText);
                if (this.codeCounter < this.codes.length - 1) {
                    this.getTranslation(translation.translatedText);
                }
                this.setState({translatedString: translation.translatedText});
            }.bind(this)
        );
    }

    render() {
        return (
            <div className="Aligner">
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                    onChange={this.onChange}/>
                <Form
                    translatedText={this.state.translatedString}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}

export default App;
