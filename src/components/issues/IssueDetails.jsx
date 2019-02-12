import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import DoneIssue from "./DoneIssue";
import moment from "moment";
class issueDetails extends Component {
  render() {
    const { auth, users, issueId, usecase, thisUsecase } = this.props;
    if (isEmpty(thisUsecase)) {
      return <Redirect to="/" />;
    }

    if (isLoaded(thisUsecase)) {
      const lista = usecase && usecase.filter(item => item.tipo !== thisUsecase.tipo);

      /* -----------------       QUESTA è LA MIA LISTA      --------------------- */
      const listaCollegata =
        thisUsecase.lista &&
        thisUsecase.lista.map((item, index) => {
          return (
            <li key={item} className="collection-item">
              {lista.find(itemLI => itemLI.id === item) && lista.find(itemLI => itemLI.id === item).title}
            </li>
          );
        });

      const done = issueId + "Done";
      if (!auth.uid) return <Redirect to="/signin" />;
      let user = users ? users[thisUsecase.authorId] : "";

      return (
        <div className="container section issue-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="grey-text">{thisUsecase.tipo}</span>
              <span className="card-title">{thisUsecase.title}</span>
              <p>{thisUsecase.content}</p>
              <ul className="collection">{listaCollegata}</ul> {/*QUI INSERISCO LA*/}
            </div>
            <DoneIssue issue={thisUsecase} lista={lista} id={done} idIssue={issueId} tipo={thisUsecase.tipo} history={this.props.history} />
            <div className="card-action">
              <button data-target={done} className="btn green white-text modal-trigger">
                Risolvi
              </button>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                Posted by {user.firstName} {user.lastName}
              </div>
              <div>{moment(thisUsecase.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    issueId: id,
    auth: state.firebase.auth,
    users: state.firestore.data.users,
    thisUsecase: state.firestore.data[id]
  };
};

export default connect(mapStateToProps)(issueDetails);
