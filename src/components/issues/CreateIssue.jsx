import React, { Component } from "react";
import { connect } from "react-redux";
import { createUC } from "../../store/actions/IssueActions";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import M from "materialize-css/dist/js/materialize";
class CreateIssue extends Component {
  state = {
    title: "",
    content: "",
    tipo: ""
  };
  componentDidMount() {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }
  componentDidUpdate() {
    var elems = document.querySelectorAll("select");
    M.FormSelect.init(elems);
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.tipo);
    this.props.createUC({ ...this.state });
    /*switch (this.state.tipo) {
      case "UC":
        this.props.createUC({ ...this.state });
        console.log("UC creato");
        break;
      case "RQ":
        this.props.createRQ({ ...this.state });
        console.log("UC creato");
        break;
      default:
        break;
    }*/
    this.props.history.push("/");
  };
  render() {
    const { auth, users } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Aggiungi</h5>
          <div className="input-field">
            <input type="text" id="title" onChange={this.handleChange} required className="validate" />
            <label htmlFor="title">Titolo</label>
          </div>

          <div className="input-field">
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange} />
            <label htmlFor="content">Contenuto</label>
          </div>

          <div className="input-field col s12">
            <select required id="tipo" onChange={this.handleChange} required className="valid invalid">
              <option defaultValue value="">
                Seleziona un elemento
              </option>
              <option value="UC">Caso d'uso</option>
              <option value="RQ">Requisito</option>
            </select>
            <label>Tipo di elemento</label>
          </div>

          <div className="input-field">
            <button type="submit" className="btn pink lighten-1">
              Aggiungi
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.firestore.ordered.users,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUC: issue => dispatch(createUC(issue))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users", orderBy: ["firstName", "asc"] }])
)(CreateIssue);