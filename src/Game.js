import React, { Component } from "react";
import Board from "./Board";
//import Settings from "./Settings";

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
    //let value = event.target.value;
    let name = event.target.name;
    let value = parseInt(event.target.value);
    console.log(name + " " + value);
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        React Minesweeper
        <br />
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
