import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 8,
      cols: 8,
      mines: 5
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
  }

  handleChange(event) {
    //let value = event.target.value;
    let name = event.target.name;
    let value = parseInt(event.target.value);

    this.setState({
      [name]: value
    });
  }

  updateBoard(event) {
    let rowMessage = this.verifyRows(this.state.rows);
    let colMessage = this.verifyCols(this.state.cols);
    let minewMessage = this.verifyMineCount(this.state.mines);
    let newMessage = "";

    if (rowMessage !== "") {
      newMessage = newMessage + rowMessage + "\n";
    }
    if (colMessage !== "") {
      newMessage = newMessage + colMessage + "\n";
    }
    if (minewMessage !== "") {
      newMessage = newMessage + minewMessage + "\n";
    }

    if (newMessage === "") {
      console.log(this.props);
      this.props.update(this.state.rows, this.state.cols, this.state.mines);
    } else {
      alert(newMessage);
    }
  }

  verifyRows(value) {
    let message = "";
    if (value > 10) {
      message = "The number of rows cannot exceed 10";
    } else if (value < 1) {
      message = "The number of rows cannot be lower than 1";
    }
    return message;
  }

  verifyCols(value) {
    let message = "";
    if (value > 10) {
      message = "The number of columns cannot exceed 10";
    } else if (value < 1) {
      message = "The number of columns cannot be lower than 1";
    }
    return message;
  }

  verifyMineCount(value) {
    let message = "";
    if (value > this.state.rows + this.state.cols) {
      message =
        "The number of mines cannot exceed " +
        (this.state.rows + this.state.cols);
    } else if (value < 1) {
      message = "The number of mines cannot be lower than 1";
    }
    return message;
  }

  render() {
    console.log(this.state);
    return (
      <div>
        Rows:
        <input
          name="rows"
          value={this.state.rows}
          onChange={this.handleChange}
        />
        Columns:
        <input
          name="cols"
          value={this.state.cols}
          onChange={this.handleChange}
        />
        Mine Count:
        <input
          name="mines"
          value={this.state.mines}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.updateBoard}>
          Reset Board
        </button>
      </div>
    );
  }
}

export default Settings;
