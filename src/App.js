import React, {Component} from "react";
import {googleTranslate} from "./utils/googleTranslate";
import {Form} from "./form/Form";
import "./App.css";
import ReCAPTCHA from "react-google-recaptcha";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {translatedString: "", captchaToken: ""};

        this.codeCounter = 0;
        this.codes = ["en", "af", "am", "ar", "az", "be", "bg", "bn", "bs", "ca", "en"];

        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTranslation = this.getTranslation.bind(this);
        this.onChange = this.onChange.bind(this);
        this.passedRecaptcha = this.passedRecaptcha.bind(this);
    }

    handleSubmit(text) {
        this.getTranslation(text);
    }

    onChange(value) {
        // console.log("Captcha value:", value);
        this.setState({captchaToken: value});
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

    passedRecaptcha() {
        return this.state.captchaToken !== "";
    }

    render() {
        return (
            <div className="Aligner">
                {this.passedRecaptcha() ? <Form
                    translatedText={this.state.translatedString}
                    onSubmit={this.handleSubmit}
                /> : <ReCAPTCHA
                    sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                    onChange={this.onChange}/>}
            </div>
        );
    }
}

export default App;
