import React, { Component } from "react";
import TablaPaises from "./componentes/tablaPaises";
import ComboRegiones from "./componentes/comboRegiones";
import "./css/App.css";
import logo from "./unpaz.png";

class App extends Component {
  state = {
    paises: [],
    paisesFiltrado: [],
    regiones: [],
    subregiones: [],
    campos: [],
    top: [],
  };

  async componentDidMount() {
    try {
      const datos = await fetch("https://restcountries.eu/rest/v2/all", {
        method: "GET",
      });
      const paises = await datos.json();
      //"otra opcion" const regiones=paises.map(e=>e.region).filter((e,index,array)=>array.indexOf(e) === index)
      const regiones = Array.from(new Set(paises.map((e) => e.region)));
      const subregiones = Array.from(new Set(paises.map((e) => e.subregion)));
      this.setState({
        paises: paises,
        paisesFiltrado: paises,
        regiones: regiones,
        subregiones: subregiones,
        campos: ["Pais", "Capital", "Poblacion", "Area"],
        top: ["Poblacion", "Area"],
      });
    } catch (err) {
      alert("Se produjo el siguiente error: " + err);
      this.setState({ paises: [], paisesFiltrado: [], regiones: [] });
    }
  }

  eventComboLVL1 = (e) => {
    if (e.target.value === "0") {
      this.setState({ paisesFiltrado: this.state.paises });
    } else {
      const paisesFiltrado = this.state.paises.filter(
        (p) => p.region === e.target.value
      );
      const sub = paisesFiltrado
        .map((e) => e.subregion)
        .filter((e, index, array) => array.indexOf(e) === index);
      this.setState({ paisesFiltrado: paisesFiltrado, subregiones: sub });
    }
  };
  eventComboLVL2 = (e) => {
    const paisesFiltrado = this.state.paises.filter(
      (p) => p.subregion === e.target.value
    );
    console.log(paisesFiltrado);
    this.setState({ paisesFiltrado: paisesFiltrado });
  };

  eventSortCombo = (e) => {
    const data = this.state.paisesFiltrado;
    let sortdata = {};
    if (e.target.value === "Capital") {
      sortdata = data.sort((a, b) => (a.capital > b.capital ? 1 : -1));
      this.setState({ paisesFiltrado: sortdata });
    }
    if (e.target.value === "Poblacion") {
      sortdata = data.sort((a, b) => a.population - b.population);
      this.setState({ paisesFiltrado: sortdata });
    }
    if (e.target.value === "Pais") {
      sortdata = data.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.setState({ paisesFiltrado: sortdata });
    }
    if (e.target.value === "Area") {
      sortdata = data.sort((a, b) => a.area - b.area);
      this.setState({ paisesFiltrado: sortdata });
    }
  };
  eventTop = (e) => {
    const data = this.state.paises;
    let topdata = {};
    if (e.target.value === "Poblacion") {
      topdata = data.sort((a, b) => (b.population-a.population ))
                     .filter((e,index)=>index<10)  
      this.setState({ paisesFiltrado: topdata });
    }
    if (e.target.value === "Area") {
      topdata = data.sort((a, b) => b.area - a.area)
                    .filter((e,index)=>index<10) 
      this.setState({ paisesFiltrado: topdata });
    }
  };

  render() {
    const { paisesFiltrado, regiones, subregiones, campos, top } = this.state;

    return (
      <div className="App">
        <div className="bar-functions">
          <div className="filters-container generic">
            <div className="filter-title">
              <h2>Filtros</h2>
            </div>
            <div className="region-filter">
              <ComboRegiones
                regiones={regiones}
                titulo="Seleccione una region.."
                handerCombo={this.eventComboLVL1}
              />
            </div>
            <div className="subregion-filter">
              <ComboRegiones
                regiones={subregiones}
                titulo="Seleccione una sub region.."
                handerCombo={this.eventComboLVL2}
              />
            </div>
          </div>
          <div className="sorts-container generic">
            <div className="sort-title">
              <h2>Ordenamiento</h2>
            </div>
            <div className="sort-combo">
              <ComboRegiones
                regiones={campos}
                titulo="Seleccione un campo"
                handerCombo={this.eventSortCombo}
              />
            </div>
          </div>
          <div className="Top-container generic">
            <div className="Top-title">
              <h2>TOP 10</h2>
            </div>
            <div className="top-combo">
              <ComboRegiones
                regiones={top}
                titulo="Seleccione un campo"
                handerCombo={this.eventTop}
              />
            </div>
          </div>
          <div className="logo-container">
            <img src={logo} height="70%" width="70%" />
          </div>
        </div>
        <div className="table-container">
          <TablaPaises
            listaPaises={paisesFiltrado}
            tituloTabla="Listado de Paises"
          />
        </div>
      </div>
    );
  }
}

export default App;
