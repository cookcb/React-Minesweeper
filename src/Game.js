import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
  render() {
    return (
      <div>
        React Minesweeper
        <Board height={5} width={5} mines={3} />
      </div>
    );
  }
}

export default Game;
