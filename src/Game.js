import React, { Component } from "react";
import Board from "";
//import ReactDOM from "react-dom";

class Game extends Component {
  render() {
    return (
      <div>
        React Minesweeper
        <Board height={6} width={6} mines={8} />
      </div>
    );
  }
}

export default Game;
