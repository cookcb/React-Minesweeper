import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      rows: 10,
      cols: 10,
      mines: 4
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let name = event.target.name;
    let value = parseInt(event.target.value);
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <h1>React Minesweeper</h1>
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
        <Board
          height={this.state.rows}
          width={this.state.cols}
          mines={this.state.mines}
        />
      </div>
    );
  }
}

export default Game;
