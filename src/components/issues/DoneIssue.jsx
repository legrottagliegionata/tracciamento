import React, { Component } from "react";
import M from "materialize-css";
import { connect } from "react-redux";
import { updateUC } from "../../store/actions/IssueActions";

class DoneIssue extends Component {
  state = { lista: [] };

  handleChange = event => {
    let opts = [],
      opt;

    for (let i = 0, len = event.target.options.length; i < len; i++) {
      opt = event.target.options[i];
      if (opt.selected) {
        opts.push(opt.value);
      }
    }
    this.setState({ lista: opts });
  };

  handleSubmit = e => {
    const id = { id: this.props.idIssue };
    e.preventDefault();
    this.props.updateUC({ ...this.props.issue, ...this.state, ...id });
  };

  componentDidMount() {
    var elems = document.querySelectorAll(".modal");
    M.Modal.init(elems);
    var select = document.querySelectorAll("select");
    M.FormSelect.init(select);
  }

  render() {
    const { lista } = this.props;

    return (
      //Modal Structure
      <div id={this.props.id} className="modal">
        <div className="modal-content">
          <h4>Descrizione delle soluzione</h4>
          <form className="white" onSubmit={this.handleSubmit}>
            <div className="input-field col s12">
              <select multiple className="valid invalid" onChange={this.handleChange}>
                {lista &&
                  lista.map(element => {
                    return (
                      <option key={element.id} value={element.id}>
                        {element.title}
                      </option>
                    );
                  })}
              </select>
              <label>Tipo di elemento</label>
            </div>

            <div className="input-field">
              <button type="submit" className="modal-close btn green white-text ">
                Salva
              </button>
              <button href="#!" className="modal-close btn red white-text  ">
                Annulla
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateUC: issue => dispatch(updateUC(issue))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(DoneIssue);
