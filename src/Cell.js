import React, { Component } from "react";

class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: props.value
    };
  }
  render() {
    let value = this.state.val;
    return <div className="cell">{value}</div>;
  }
}

export default Cell;
