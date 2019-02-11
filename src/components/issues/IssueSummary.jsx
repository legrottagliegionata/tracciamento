import React, { Component } from "react";
import moment from "moment";
import "moment/locale/it";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import DoneIssue from "./DoneIssue";

class IssueSummary extends Component {
  render() {
    const { issueId, usecase, thisUsecase } = this.props;

    moment.locale("it");

    if (isLoaded(thisUsecase)) {
      const lista = usecase && usecase.filter(item => item.tipo !== thisUsecase.tipo);
      const done = issueId + "Done";

      const elenco = thisUsecase.lista.length ? (
        <ul className="collection">
          {thisUsecase.lista &&
            thisUsecase.lista.map((item, index) => {
              return (
                <li key={item + index + issueId} className="collection-item">
                  {usecase.find(l => l.id === item) && usecase.find(l => l.id === item).title}
                </li>
              );
            })}
        </ul>
      ) : null;
      return (
        <div className="card sticky-action z-depth-0 mt-0">
          <Link to={"/issue/" + issueId} className="block card-content grey-text text-darken-3 pt-2 pb-0">
            <span className="grey-text">{thisUsecase.tipo}</span>
            <span className="card-title truncate uppercase">{thisUsecase.title}</span>
            <span>{elenco}</span>
          </Link>
          <DoneIssue issue={thisUsecase} lista={lista} id={done} idIssue={issueId} tipo={thisUsecase.tipo} />
          <div className="card-action">
            <button data-target={done} className="btn green white-text modal-trigger">
              Risolvi
            </button>
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}
const mapStateToProps = (state, props) => {
  return {
    auth: state.firebase.auth.id,
    thisUsecase: state.firestore.data[props.issueId]
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(props => [{ collection: "usecase", storeAs: props.issueId, doc: props.issueId }])
  /*spinnerWhileLoading(["thisUsecase"]),
  // render empty message if projects are not found
  renderIfEmpty(["thisUsecase"], "VUOTO")*/
)(IssueSummary);
