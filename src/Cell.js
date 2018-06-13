import React, { Component } from "react";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.value,
      cellId: props.id,
      isRevealed: props.revealed,
      row: props.row,
      col: props.col
    };
  }

  /*TODO - look into update functionality */

  static getDerivedStateFromProps = (newProps, prevState) => {
    return {
      isRevealed: newProps.revealed
    };
  };

  cellClicked = event => {
    let r = this.state.row;
    let c = this.state.col;
    this.props.onLeftClick(event.target.id, r, c);
  };

  render() {
    let value = this.state.val;
    if (this.state.isRevealed === true) {
      return (
        <div
          /*TODO - Create CSS Module instead of seperate file */
          className="cell cell-is-revealed"
          id={this.state.cellId}
          onClick={this.cellClicked.bind(this)}
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
        />
      );
    }
  }
}

export default Cell;
