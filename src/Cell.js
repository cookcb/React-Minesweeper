import React, { Component } from "react";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.value,
      cellId: props.id
    };
  }

  cellClicked = event => {
    this.props.onLeftClick(event.target.id);
  };

  render() {
    let value = this.state.val;
    return (
      <div
        className="cell"
        id={this.state.cellId}
        onClick={this.cellClicked.bind(this)}
      >
        {value}
      </div>
    );
  }
}

export default Cell;
