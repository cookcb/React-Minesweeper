import React, { Component } from "react";
import Cell from "./Cell.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height,
      width: props.width,
      mines: props.mines,
      cells: this.initBoardData(props.height, props.width)
    };
  }

  renderCell = val => {
    return <Cell value={val} />;
  };

  initBoardData = (height, width) => {
    let data = this.createArray(height, width);
    return data;
  };

  createArray = (height, width) => {
    let cellData = [];
    for (let i = 0; i < height; i++) {
      cellData.push([]);
      for (let j = 0; j < width; j++) {
        cellData[i][j] = {};
      }
    }
    return cellData;
  };

  renderBoard = data => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        return <Cell value={j} />;
      }
    }
  };

  render() {
    return <div className="board">{this.renderBoard(this.state.cells)}</div>;
  }
}

export default Board;
