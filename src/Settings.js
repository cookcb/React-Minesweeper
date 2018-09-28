import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 0,
      cols: 0,
      mines: 0
    };
  }

  render() {
    return (
      <div>
        Rows:
        <input />
        Columns:
        <input />
        Mine Count:
        <input />
      </div>
    );
  }
}

export default Settings;
