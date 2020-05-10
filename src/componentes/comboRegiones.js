import React, { Component } from "react";

class ComboRegiones extends Component {
  render() {
    const { regiones,titulo, handerCombo } = this.props;
    return (
      <div>
        <select onChange={handerCombo}>
          <option key={-1} value={0}>{titulo}</option>
          {regiones.map((r,i)=>(<option key={i} value={r}>{r}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default ComboRegiones;
