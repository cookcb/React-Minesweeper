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
      data[item.row][item.col].value = "M";
    });
  };

  setValues = data => {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j].isMine !== true) {
          this.traverseNeighbors(i, j, data);
        }
      }
    }
  };

  initBoardData = (height, width, mineCount) => {
    let data = this.createArray(height, width);
    this.setMines(data, mineCount);
    this.setValues(data);

    return data;
  };

  createArray = (height, width) => {
    let cellData = [];
    for (let i = 0; i < height; i++) {
      cellData.push([]);
      for (let j = 0; j < width; j++) {
        cellData[i][j] = {
          key: "R" + i + "C" + j,
          id: i + "-" + j,
          revealed: false,
          isMine: false,
          value: "",
          row: i,
          col: j
        };
      }
    }
    return cellData;
  };

  /*Handle Click Event (Reveal Cell)*/
  handleLeftClick = (cellId, row, col) => {
    let newCell = "";
    let cells = this.state.cells.map(function(arr) {
      return arr.slice();
    });

    let newCells = this.reveal(cells, row, col);
    this.setState({ cells: newCells });
  };

  /*TODO - Handle Right Click Event (Flag)*/
  reveal = (cells, row, col) => {
    if (cells[row][col].revealed === false) {
      cells[row][col].revealed = true;
    } else {
      return cells;
    }
    return cells;
  };
  /*TODO - need function to recursively reveal adjacent cells */
  clearNeighbors = (row, col, data) => {};

  /*TODO - Handle Right Click Event (Flag)*/

  traverseNeighbors = (row, col, data) => {
    let mineCnt = 0;
    let minRow = row - 1,
      minCol = col - 1,
      maxRow = row + 1,
      maxCol = col + 1;
    for (let i = minRow; i <= maxRow; i++) {
      //Row Edge Check
      if (i < 0 || i > data.length - 1) {
        continue;
      }
      for (let j = minCol; j <= maxCol; j++) {
        //Column Edge Check
        if (j < 0 || j > data[i].length - 1) {
          continue;
        }
        if (data[i][j].isMine === true) {
          mineCnt++;
        }
      }
    }
    //Set the value of the cell to the number of mines around cell
    if (mineCnt !== 0) {
      data[row][col].value = mineCnt;
    }
  };

  renderBoard = data => {
    return data.map(row => {
      return row.map(item => {
        /*TODO - need to add key to cell components */
        return (
          <Cell
            key={item.key}
            value={item.value}
            id={item.id}
            row={item.row}
            col={item.col}
            revealed={item.revealed}
            onLeftClick={this.handleLeftClick.bind(this)}
          />
        );
      });
    });
  };

  render() {
    return <div className="board">{this.renderBoard(this.state.cells)}</div>;
  }
}

export default Board;
