import React, { Component } from "react";
import "./compoents_style/Table.css";
class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      membros: [],
    };
    this.renderMembers = this.renderMembers.bind(this);
    this.changeRenderInfo = this.changeRenderInfo.bind(this);
  }

  //---- System Functions
  loadDB() {
    fetch("http://localhost:3001/membros")
      .then((res) => res.json())
      .then((res) => this.setState({ membros: res }));
  }

  //-----------------

  renderMembers() {
    let membros = this.state.membros;
    return membros.map((index) => {
      if (index.id > 0) {
        return (
          <tr key={index.id} className="Member" id={index.id}>
            <td>{index.data_registro}</td>
            <td>{index.nome}</td>
            <td>{index.telefone}</td>
            <td>{index.endereco}</td>
            <td>{index.cidade}</td>
            <td>{index.bairro}</td>
            <td>{index.aniversario}</td>
            <td>{index.invited}</td>
            <td>{index.visiting}</td>
            <td>{index.acceptcall}</td>
            <td>{index.period}</td>
          </tr>
        );
      } else{
        return null;
      }
    });
  }

  //----------------

  //----------------

  componentDidMount() {
    this.loadDB();
  }

  //---------------------

  changeRenderInfo(event) {
    let memberinfo = this.state.membros;
    let ParentElement = event.target.parentElement.className;
    let arrayid = event.target.parentElement.id ;
    if (ParentElement === "Intern_info") {
      event.target.parentElement.className = "Member";
      event.target.parentElement.innerHTML = `<td> ${
        memberinfo[arrayid].data_registro
      }</td>
      <td> ${memberinfo[arrayid].nome}</td>
      <td> ${memberinfo[arrayid].telefone}</td>
      <td> ${memberinfo[arrayid].endereco}</td>
      <td> ${memberinfo[arrayid].cidade}</td>
      <td> ${memberinfo[arrayid].bairro}</td>
      <td> ${memberinfo[arrayid].aniversario}</td>
      <td> ${memberinfo[arrayid].invited}</td>
      <td> ${memberinfo[arrayid].visiting}</td>
      <td> ${memberinfo[arrayid].acceptcall}</td>
      <td> ${memberinfo[arrayid].period}</td>
      
      `;
    } else {
      event.target.parentElement.className = "Intern_info";
      event.target.parentElement.innerHTML = `<td colspan=11> Data de Preenchimento: ${(memberinfo[
        arrayid
      ].data_preenchido += " | ")}
        Preenchido Por: ${(memberinfo[arrayid].preenchido +=
          " | ")}                
          Fonovisita Feita Por: ${(memberinfo[arrayid].fonovisia += " | ")}
          Lider Responsável: ${memberinfo[arrayid].lider}
       </td>`;
    }
  }

  //-----------------
  render() {
    return (

      <table className="table" id="table">
        <thead className="thead-dark " id="tablehead">
          <tr>
            <th scope="col">Data Registro</th>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Endereço</th>
            <th scope="col">Cidade</th>
            <th scope="col">Bairro</th>
            <th scope="col">Aniverssário</th>
            <th scope="col">Convidado Por</th>
            <th scope="col">Visitando</th>
            <th scope="col">Aceita Ligações</th>
            <th scope="col">Melhor Horario</th>
          </tr>
        </thead>
        <tbody
          onClick={(event) => {
            this.changeRenderInfo(event);
          }}
          id="tableboddy"
        >
          {this.renderMembers()}
        </tbody>
      </table>
    );
  }
}

export default Table;
