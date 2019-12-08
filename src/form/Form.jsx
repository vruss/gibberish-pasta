import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "../App.css";

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputText: "", outputText: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ inputText: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.inputText);
    this.props.onSubmit(this.state.inputText);
    event.preventDefault();
  }

  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        <div className="Aligner-item">
          <TextField
            id="input-gibberish"
            required
            multiline
            placeholder="Input"
            label="Gibberish Input"
            variant="outlined"
            rows="4"
            value={this.state.inputText}
            onChange={this.handleChange}
          ></TextField>
        </div>
        <div className="Aligner-item">
          <Button variant="contained" color="primary" type="submit">
            Hello World
          </Button>
        </div>
        <div className="Aligner-item">
          <TextField
            id="output-gibberish"
            multiline
            placeholder="Output"
            label="Gibberish Output"
            variant="outlined"
            value={this.props.translatedText}
            InputProps={{
              readOnly: true
            }}
            rows="4"
          ></TextField>
        </div>
      </form>
    );
  }
}
