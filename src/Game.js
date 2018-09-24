import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
  render() {
    return (
      <div>
        React Minesweeper
        <Board height={4} width={10} mines={9} />
      </div>
    );
  }
}

export default Game;
