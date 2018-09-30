import React, { Component } from "react";
import Board from "./Board";
import Settings from "./Settings";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      height: 10,
      width: 10,
      mineCount: 4
    };
    this.updateBoardSettings = this.updateBoardSettings.bind(this);
  }

  updateBoardSettings(rows, cols, mines) {
    this.setState({
      height: rows,
      width: cols,
      mines: mines
    });
  }

  render() {
    return (
      <div>
        React Minesweeper
        <Settings update={this.updateBoardSettings} />
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
          height={this.state.height}
          width={this.state.width}
          mines={this.state.mineCount}
        />
      </div>
    );
  }
}

export default Game;
