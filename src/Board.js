import React, { Component } from "react";
import Cell from "./Cell.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height,
      width: props.width,
      mines: props.mines,
      cells: this.initBoardData(props.height, props.width, props.mines)
    };
  }

  renderCell = val => {
    return <Cell value={val} />;
  };

  /*Set the mine locations on the grid */
  setMines = (data, mineCnt) => {
    let currentMines = [];
    for (let i = 0; i < mineCnt; i++) {
      Math.floor(Math.random * 63);
      currentMines.push({
        row: Math.floor(Math.random() * 7),
        col: Math.floor(Math.random() * 7)
      });
    }
    currentMines.forEach(item => {
      data[item.row][item.col].isMine = true;
      data[item.row][item.col].value = "B";
    });
  };

  setValues = data => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j].isMine !== true) {
        }
      }
    }
  };

  initBoardData = (height, width, mineCount) => {
    let data = this.createArray(height, width);
    this.setMines(data, mineCount);
    /*Set other values */
    console.log(data);
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
          isMine: false,
          value: ""
        };
      }
    }
    return cellData;
  };

  /*TODO - Handle Click Event (Reveal Cell)*/

  /*TODO - Handle Right Click Event (Flag)*/

  traverseNeighbors = (row, col) => {
    let mineCnt = 0;
    let minRow = row - 1,
      minCol = col - 1,
      maxRow = row + 1,
      maxCol = col + 1;
  };

  renderBoard = data => {
    return data.map(row => {
      return row.map(item => {
        /*TODO - need to add key to cell components */
        return <Cell key={item.key} value={item.value} />;
      });
    });
  };

  render() {
    return <div className="board">{this.renderBoard(this.state.cells)}</div>;
  }
}

export default Board;
