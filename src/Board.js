import React, { Component } from "react";
import Cell from "./Cell.js";

const board = {
  //maxWidth: "400px",
  margin: "auto"
};

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

  static getDerivedStateFromProps = (newProps, prevState) => {
    return {
      height: newProps.height,
      width: newProps.width,
      mines: newProps.mines
    };
  };

  renderCell = val => {
    return <Cell value={val} />;
  };

  /*Set the mine locations on the grid */
  setMines = (data, mineCnt) => {
    let currentMines = [];
    console.log(mineCnt);
    while (currentMines.length < mineCnt) {
      let row = Math.floor(Math.random() * (data.length - 1));
      let col = Math.floor(Math.random() * (data[0].length - 1));
      let existingItem = currentMines.find(item => {
        return item.row === row && item.col === col;
      });
      if (typeof existingItem === "undefined") {
        currentMines.push({
          row: row,
          col: col
        });
      }
    }
    currentMines.forEach(item => {
      data[item.row][item.col].isMine = true;
      data[item.row][item.col].value = "💥";
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
    //console.log(board);

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
          isFlagged: false,
          value: "",
          row: i,
          col: j
        };
      }
    }
    return cellData;
  };

  /*Handle Click Event (Reveal Cell)*/
  handleClick = (eventType, row, col) => {
    let cells = this.state.cells.map(function(arr) {
      return arr.slice();
    });
    let wonGame = false;
    if (eventType === "click") {
      if (cells[row][col].isFlagged === true) {
        return;
      } else if (cells[row][col].isMine === true) {
        alert("GAME OVER");
        cells = this.revealBoard(cells);
      } else {
        cells = this.revealCascade(cells, row, col);
      }
    } else if (eventType === "contextmenu") {
      if (cells[row][col].isFlagged === false) {
        let flaggedCell = cells[row][col];
        flaggedCell.isFlagged = true;
      } else if (cells[row][col].isFlagged === true) {
        let flaggedCell = cells[row][col];
        flaggedCell.isFlagged = false;
      }
    }
    wonGame = this.gameStatus(cells);
    if (wonGame === true) {
      alert("YOU WON");
      cells = this.revealBoard(cells);
    }
    this.setState({ cells: cells });
  };

  revealCascade = (cells, row, col) => {
    if (
      row > cells.length - 1 ||
      row < 0 ||
      col < 0 ||
      col > cells[row].length - 1
    ) {
      return;
    } else if (
      cells[row][col].value === "" &&
      cells[row][col].revealed === false
    ) {
      cells[row][col].revealed = true;
      this.revealCascade(cells, row + 1, col);
      this.revealCascade(cells, row - 1, col);
      this.revealCascade(cells, row, col - 1);
      this.revealCascade(cells, row, col + 1);
      return cells;
    } else if (
      cells[row][col].value !== "" &&
      cells[row][col].revealed === false
    ) {
      cells[row][col].revealed = true;
      return cells;
    } else {
      return cells;
    }
  };

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

  revealBoard = data => {
    return data.map(arr => {
      return arr.map(item => {
        let newItem = Object.assign({}, item);
        if (newItem.revealed !== true) {
          newItem.revealed = true;
          newItem.flagged = false;
        }
        return newItem;
      });
    });
  };

  gameStatus = data => {
    let mineCnt = this.state.mines;
    let flaggedMineCnt = 0;
    let remainingCells = 0;
    let wonGame = false;
    data.forEach(arr => {
      arr.forEach(item => {
        if (item.revealed === false) {
          remainingCells++;
        }
        if (item.isMine === true && item.isFlagged === true) {
          flaggedMineCnt++;
        }
      });
    });
    if (flaggedMineCnt === mineCnt || remainingCells === mineCnt) {
      return true;
    }
    return false;
  };

  resetBoard(event) {
    let { height, width, mines } = this.state;
    let rowMessage = this.verifyRows(height);
    let colMessage = this.verifyCols(width);
    let minewMessage = this.verifyMineCount(mines);
    let newMessage = "";

    if (rowMessage !== "") {
      newMessage = newMessage + rowMessage + "\n";
    }
    if (colMessage !== "") {
      newMessage = newMessage + colMessage + "\n";
    }
    if (minewMessage !== "") {
      newMessage = newMessage + minewMessage + "\n";
    }

    if (newMessage === "") {
      this.setState({
        cells: this.initBoardData(height, width, mines)
      });
    } else {
      alert(newMessage);
    }
  }

  verifyRows(value) {
    let message = "";
    if (value > 10) {
      message = "The number of rows cannot exceed 10";
    } else if (value < 1) {
      message = "The number of rows cannot be lower than 1";
    }
    return message;
  }

  verifyCols(value) {
    let message = "";
    if (value > 10) {
      message = "The number of columns cannot exceed 10";
    } else if (value < 1) {
      message = "The number of columns cannot be lower than 1";
    }
    return message;
  }

  verifyMineCount(value) {
    let message = "";
    if (value > this.state.rows + this.state.cols) {
      message =
        "The number of mines cannot exceed " +
        (this.state.rows + this.state.cols);
    } else if (value < 1) {
      message = "The number of mines cannot be lower than 1";
    }
    return message;
  }

  renderBoard = data => {
    return data.map(row => {
      return row.map(item => {
        /*TODO - need to add key to cell components */
        return (
          <Cell
            key={item.key}
            value={item.value}
            flagged={item.isFlagged}
            id={item.id}
            row={item.row}
            col={item.col}
            revealed={item.revealed}
            onLeftClick={this.handleClick.bind(this)}
          />
        );
      });
    });
  };

  render() {
    let board = {
      //maxWidth: "400px",
      margin: "auto"
    };
    board.maxWidth = "" + this.state.width * 50 + "px";
    return (
      <div>
        <button type="button" onClick={this.resetBoard.bind(this)}>
          Reset Board
        </button>
        <div style={board}>{this.renderBoard(this.state.cells)}</div>
      </div>
    );
  }
}

export default Board;
