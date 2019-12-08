import React, { Component } from "react";

import { googleTranslate } from "./utils/googleTranslate";
import { Form } from "./form/Form";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { translatedString: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(text) {
    this.getTranslation(text);
  }

  getTranslation(text) {
    googleTranslate.translate(
      text,
      "sv",
      function(err, translation) {
        console.log(translation.translatedText);
        this.setState({ translatedString: translation.translatedText });
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="Aligner">
        <Form
          translatedText={this.state.translatedString}
          onSubmit={this.handleSubmit}
        ></Form>
      </div>
    );
  }
}

export default App;
