import React from "react";

export default function comboRegiones(props)
 {
 const { regiones,titulo,handerCombo } = props;
  return (
    <div>
         <select onChange={handerCombo}>
          <option key={-1} value={0}>{titulo}</option>
          {regiones.map((r,i)=>(<option key={i} value={r}>{r}</option>
          ))}
        </select>
    </div>
  )
}



