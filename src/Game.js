import React, { Component } from "react";
import Board from "./Board";
import Settings from "./Settings";

class Game extends Component {
  constructor() {
    super();
    this.state = {
      height: 10,
      width: 10,
      mineCount: 20
    };
    this.updateBoardSettings = this.updateBoardSettings.bind(this);
  }

  updateBoardSettings(rows, cols, mines) {
    console.log(mines);
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
