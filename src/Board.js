import React, { Component } from "react";
import Cell from "Cell.js";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height,
      width: props.width
    };
  }
}
