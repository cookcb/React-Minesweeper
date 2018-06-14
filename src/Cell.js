import React, { Component } from "react";

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

  /*TODO - look into update functionality */

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
          /*TODO - Create CSS Module instead of seperate file */
          className="cell cell-is-hidden"
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
          /*TODO - Create CSS Module instead of seperate file */
          className="cell cell-is-revealed"
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
          className="cell cell-is-hidden"
          id={this.state.cellId}
          onClick={this.cellClicked.bind(this)}
          onContextMenu={this.cellClicked.bind(this)}
        />
      );
    }
  }
}

export default Cell;
