import React, { Component } from "react";
import Board from "./Board";
import Settings from "./Settings";

class Game extends Component {
  render() {
    return (
      <div>
        React Minesweeper
        <Board height={8} width={8} mines={20} />
        <Settings />
      </div>
    );
  }
}

export default Game;
