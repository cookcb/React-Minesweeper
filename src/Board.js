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

  setMines = data => {
    let mineCount = this.state.mines;
    let currentMines = [];
    for (let i = 0; i < mineCount; i++) {
      Math.floor(Math.random * 63);
      currentMines.push({
        row: Math.floor(Math.random * 7),
        col: Math.floor(Math.random * 7)
      });
    }
    data.map(() => {});
  };

  initBoardData = (height, width) => {
    let data = this.createArray(height, width);
    /*Set Mines */
    /*Set other values */
    return data;
  };

  createArray = (height, width) => {
    let cellData = [];
    for (let i = 0; i < height; i++) {
      cellData.push([]);
      for (let j = 0; j < width; j++) {
        /* TODO - Need to initialize cellData*/
        cellData[i][j] = {
          key: "R" + i + "C" + j,
          revealed: false,
          isMine: false
        };
      }
    }
    return cellData;
  };

  /*TODO - Handle Click Event (Reveal Cell)*/

  /*TODO - Handle Right Click Event (Flag)*/

  /*TODO - Assign Cell Values*/

  /**/

  renderBoard = data => {
    return data.map(row => {
      return row.map(item => {
        /*TODO - need to add key to cell components */
        return <Cell key={item.key} value={item} />;
      });
    });
  };

  render() {
    return <div className="board">{this.renderBoard(this.state.cells)}</div>;
  }
}

export default Board;
