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
    console.log(value);
    return <div className="cell" />;
  }
}

export default Cell;
