import React from "react";
import "../css/table.css";

export default function tablaPaises(props) {
  const { listaPaises, tituloTabla } = props;

    const datosPaises = listaPaises.map((p) => {
      return (
        <tr key={p.alpha3Code}>
          <td>{p.alpha3Code}</td>
          <td>{p.name}</td>
          <td>{p.population}</td>
          <td>{p.area}</td>
          <td>{p.capital}</td>
          <td>{p.region}</td>
          <td>{p.subregion}</td>
          <td>
            <img src={p.flag} height={25} alt={45} />
          </td>
        </tr>
      );
    });

  return (
    <div>
    <table>
      <caption>{tituloTabla}</caption>
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Pais</th>
          <th>Poblacion</th>
          <th>Area km²</th>
          <th>Capital</th>
          <th>Region</th>
          <th>SubRegion</th>
          <th>Bandera</th>
        </tr>
      </thead>
      <tbody>{datosPaises}</tbody>
    </table>
  </div>
  )
}
