import React, { Component } from "react";
import "./compoents_style/Form.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBX5gIx4EsjJ_6Sv7iNu76LlZlB58RKzd4",
  authDomain: "saranossaterra-3cb4d.firebaseapp.com",
  databaseURL: "https://saranossaterra-3cb4d-default-rtdb.firebaseio.com",
  projectId: "saranossaterra-3cb4d",
  storageBucket: "saranossaterra-3cb4d.appspot.com",
  messagingSenderId: "703610452822",
  appId: "1:703610452822:web:a39834002e77acd02e74f7",
  measurementId: "G-SNS80264V6",
};
const app = initializeApp(firebaseConfig);

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      nome: "",
      tel: "",
      endereco: "",
      cidade: "",
      bairro: "",
      niver: "",
      invited: "",
      visiting: "Primeira Vez",
      acceptcall: {
        check: false,
        value: "Não",
      },
      period: "Não Aceita Ligações",
      preenchido: "",
      fonovisita: "",
      lider: "",
      pass: "",
    };
    this.acceptcallstate = this.acceptcallstate.bind(this);
    this.inputvalues = this.inputvalues.bind(this);
    this.visitingstate = this.visitingstate.bind(this);
    this.periodstate = this.periodstate.bind(this);
    this.validpass = this.validpass.bind(this);
    this.insertMembers = this.insertMembers.bind(this);
  }

  //--------------------------
  componentDidMount() {
    this.loadindexDB();
  }

  insertMembers() {
    let values = this.state;
    if (
      values.nome &&
      values.tel &&
      values.endereco &&
      values.cidade &&
      values.bairro &&
      values.niver &&
      values.invited &&
      values.visiting &&
      values.preenchido &&
      values.fonovisita &&
      values.lider !== ""
    ) {
      let membertoadd = this.state;

      let memberinfo = {
        id: this.state.id + 1,
        data_registro: new Date().toLocaleDateString(),
        nome: membertoadd.nome,
        telefone: membertoadd.tel,
        endereco: membertoadd.endereco,
        cidade: membertoadd.cidade,
        bairro: membertoadd.bairro,
        aniversario: membertoadd.niver,
        invited: membertoadd.invited,
        visiting: membertoadd.visiting,
        acceptcall: membertoadd.acceptcall.value,
        period: membertoadd.period,
        data_preenchido: new Date().toLocaleDateString(),
        preenchido: membertoadd.preenchido,
        fonovisia: membertoadd.fonovisita,
        lider: membertoadd.lider,
      };
      /* fetch("http://localhost:3001/membros", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(memberinfo),
      }).then(alert("Membro Registrado"));
    } else{
      alert("Campos Obrigatorios Não Preenchidos")
    }*/
      this.writeUserData(
        memberinfo.id,
        memberinfo.data_registro,
        memberinfo.nome,
        memberinfo.telefone,
        memberinfo.endereco,
        memberinfo.cidade,
        memberinfo.bairro,
        memberinfo.aniversario,
        memberinfo.invited,
        memberinfo.visiting,
        memberinfo.acceptcall,
        memberinfo.period,
        memberinfo.data_preenchido,
        memberinfo.preenchido,
        memberinfo.fonovisia,
        memberinfo.lider
      );
    }
  }
  writeUserData(
    id,
    dataregistro,
    nome,
    telefone,
    endereco,
    cidade,
    bairro,
    aniversario,
    invited,
    visiting,
    acceptcall,
    period,
    data_preenchido,
    preenchido,
    fonovisia,
    lider
  ) {
    const db = getDatabase();
    set(ref(db, `membros/${this.state.id + 1}`), {
      id: id,
      data_registro: dataregistro,
      nome: nome,
      telefone: telefone,
      endereco: endereco,
      cidade: cidade,
      bairro: bairro,
      aniversario: aniversario,
      invited: invited,
      visiting: visiting,
      acceptcall: acceptcall,
      period: period,
      data_preenchido: data_preenchido,
      preenchido: preenchido,
      fonovisia: fonovisia,
      lider: lider,
    });
  }
  loadindexDB() {
    const dbref = ref(getDatabase());
    get(dbref, `membros/`)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const memberData = snapshot.val();
          this.setState({ id: memberData.membros[memberData.membros.length -1].id });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  //--------------------------
  validpass() {
    return this.state.pass === "123";
  }
  periodstate(event) {
    this.setState({ period: event.target.value });
  }

  visitingstate(event) {
    this.setState({ visiting: event.target.value });
  }

  inputvalues(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  acceptcallstate(event) {
    this.setState(
      {
        acceptcall: {
          ...this.acceptcall,
          check: event.target.checked,
        },
      },
      () => {
        if (this.state.acceptcall.check) {
          this.setState({
            acceptcall: {
              ...this.acceptcall,
              check: true,
              value: "Sim",
            },
          });
        } else {
          this.setState(
            {
              acceptcall: {
                ...this.acceptcall,
                check: false,
                value: "Não",
              },
            },
            () => {
              this.setState({ period: "Não Aceita Ligações" });
            }
          );
        }
      }
    );
  }

  render() {
    return (
      <form id="form" className="form-row">
        <h1>Ficha De Cadastro</h1>
        <div className="row">
          {/* Nome */}
          <div className="form-group col-md-6">
            <label htmlFor="nome">Nome</label>
            <input
              type="Text"
              className="form-control"
              id="nome"
              placeholder="Nome"
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
          {/* Telefone */}
          <div className="form-group col-md-6">
            <label htmlFor="tel">Telefone</label>
            <input
              type="number"
              className="form-control"
              id="tel"
              placeholder="Telefone"
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
        </div>
        <div className="form-group">
          {/* Endereço */}
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            className="form-control"
            id="endereco"
            placeholder="Endereço"
            onInput={(event) => {
              this.inputvalues(event);
            }}
            required
          />
        </div>
        <div className="row">
          {/* Cidade */}
          <div className="form-group col-md-6">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              className="form-control"
              id="cidade"
              placeholder="Cidade"
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
          <div className="form-group col-md-6">
            {/* Bairro */}
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              className="form-control"
              id="bairro"
              placeholder="Bairro"
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
        </div>
        <div className="row">
          {/* Aniverssário */}
          <div className="form-group col-md-4">
            <label htmlFor="niver">Aniverssário</label>
            <input
              type="Date"
              className="form-control"
              id="niver"
              required
              onInput={(event) => {
                this.inputvalues(event);
              }}
            />
          </div>
          {/* Convidado por */}
          <div className="form-group col-md-8">
            <label htmlFor="invited">Convidado Por</label>
            <input
              type="text"
              className="form-control"
              id="invited"
              placeholder="Convidado Por"
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
        </div>
        {/* frequencia */}
        <div className="form-row" id="radio-group">
          <div className="custom-control custom-radio">
            <input
              type="radio"
              className="custom-control-input"
              id="defaultGroupExample1"
              name="groupOfDefaultRadios"
              defaultChecked
              onClick={(event) => {
                this.visitingstate(event);
              }}
              value="Primeira Vez"
            />
            <label
              className="custom-control-label"
              htmlFor="defaultGroupExample1"
            >
              Primera Vez
            </label>
          </div>

          <div className="custom-control custom-radio radio">
            <input
              type="radio"
              className="custom-control-input"
              id="defaultGroupExample2"
              name="groupOfDefaultRadios"
              onClick={(event) => {
                this.visitingstate(event);
              }}
              value="Segunda Vez"
            />
            <label
              className="custom-control-label"
              htmlFor="defaultGroupExample2"
            >
              Segunda Vez
            </label>
          </div>
          <div className="custom-control custom-radio">
            <input
              type="radio"
              className="custom-control-input"
              id="defaultGroupExample3"
              name="groupOfDefaultRadios"
              onClick={(event) => {
                this.visitingstate(event);
              }}
              value="Frequenta Outra Igreja"
            />
            <label
              className="custom-control-label"
              htmlFor="defaultGroupExample3"
            >
              Frequeta Outra Igreja
            </label>
          </div>
        </div>
        <div className="period-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck"
              onChange={(event) => {
                this.acceptcallstate(event);
              }}
              value="Primeira Vez"
            />
            <label className="form-check-label" htmlFor="gridCheck">
              Aceita Receber Ligações?
            </label>
          </div>
          <div className="form-group col-md-4" id="select">
            <label htmlFor="period">Melhor Horario</label>
            <select
              className="form-select"
              aria-label="Default select example"
              id="period"
              disabled={!this.state.acceptcall.check}
              onChange={(event) => {
                this.periodstate(event);
              }}
              value={this.state.period}
            >
              <option value="Selecionar">Selecionar ...</option>
              <option value="Manhã">Manhã</option>
              <option value="Tarde">Tarde</option>
              <option value="Noite">Noite</option>
            </select>
          </div>
        </div>
        <h1>Ficha Interna</h1>
        {/* Preenchido por */}
        <div className="form-group col-md-6">
          <label htmlFor="preenchido">Preenchido Por</label>
          <input
            type="Text"
            className="form-control"
            id="preenchido"
            placeholder="Preenchido Por"
            onInput={(event) => {
              this.inputvalues(event);
            }}
            required
          />
        </div>
        <div className="interna">
          {/* Fonovisita feita por */}
          <div className="form-group col-md-6">
            <label htmlFor="fonovisita">Fonovisita Feita Por</label>
            <input
              type="Text"
              className="form-control"
              id="fonovisita"
              placeholder="Fonovisita Feita Por"
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
          {/* Lider Responsavel */}
          <div className="form-group col-md-6">
            <label htmlFor="lider">Lider Responsavel</label>
            <input
              type="Text"
              className="form-control"
              id="lider"
              placeholder="Lider Responsavel"
              onInput={(event) => {
                this.inputvalues(event);
              }}
              required
            />
          </div>
        </div>
        <div className="col-md-6" id="pass-group">
          <input
            type="password"
            className="form-control"
            id="pass"
            placeholder="Senha"
            required
            onInput={(event) => {
              this.inputvalues(event);
            }}
          />
          <button
            type="submit"
            className="btn btn-outline-primary"
            disabled={!this.validpass()}
            onClick={() => this.insertMembers()}
          >
            Cadastrar!
          </button>
        </div>
      </form>
    );
  }
}

export default Form;
