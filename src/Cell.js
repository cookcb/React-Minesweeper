import React, { Component } from "react";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.value,
      cellId: props.id,
      isRevealed: props.revealed
    };
  }

  cellClicked = event => {
    this.props.onLeftClick(event.target.id);
  };

  render() {
    let value = this.state.val;
    if (this.state.isRevealed === true) {
      return (
        <div
          className="cell"
          id={this.state.cellId}
          onClick={this.cellClicked.bind(this)}
        >
          {value}
        </div>
      );
    } else {
      return (
        <div
          className="cell"
          id={this.state.cellId}
          onClick={this.cellClicked.bind(this)}
        />
      );
    }
  }
}

export default Cell;
