import React, { Component } from "react";

let cell_hidden = {
  width: "45px",
  float: "left",
  height: "45px",
  border: "1px solid black",
  backgroundColor: "dimgrey",
  textAlign: "center",
  backgroundColor: "#0066cc",
  lineHeight: "45px"
};

let cell_revealed = {
  width: "45px",
  float: "left",
  height: "45px",
  border: "1px solid black",
  backgroundColor: "dimgrey",
  textAlign: "center",
  backgrounColor: "#cccccc",
  lineHeight: "45px"
};

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.value,
      cellId: props.id,
      isRevealed: props.revealed,
      isFlagged: props.flagged,
      row: props.row,
      col: props.col
    };
  }

  static getDerivedStateFromProps = (newProps, prevState) => {
    return {
      isRevealed: newProps.revealed,
      isFlagged: newProps.flagged,
      val: newProps.value
    };
  };

  cellClicked = event => {
    let r = this.state.row;
    let c = this.state.col;
    event.preventDefault();
    this.props.onLeftClick(event.type, r, c);
  };

  render() {
    let value = this.state.val;
    if (this.state.isFlagged === true && this.state.isRevealed === false) {
      return (
        <div
          style={cell_hidden}
          id={this.state.cellId}
          onClick={this.cellClicked.bind(this)}
          onContextMenu={this.cellClicked.bind(this)}
        >
          <span role="img" aria-label="Flag">
            🚩
          </span>
        </div>
      );
    } else if (this.state.isRevealed === true) {
      return (
        <div
          style={cell_revealed}
          id={this.state.cellId}
          onClick={this.cellClicked.bind(this)}
          onContextMenu={this.cellClicked.bind(this)}
        >
          {value}
        </div>
      );
    } else {
      return (
        <div
          style={cell_hidden}
          id={this.state.cellId}
          onClick={this.cellClicked.bind(this)}
          onContextMenu={this.cellClicked.bind(this)}
        />
      );
    }
  }
}

export default Cell;
