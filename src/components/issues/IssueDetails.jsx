import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import DoneIssue from "./DoneIssue";
import moment from "moment";
class issueDetails extends Component {
  render() {
    const { auth, users, issueId, usecase } = this.props;
    const issue = usecase && usecase.filter(item => item.id === issueId)[0];
    if (issue) {
      const lista = usecase && usecase.filter(item => item.tipo !== issue.tipo);

      /* -----------------       QUESTA è LA MIA LISTA      --------------------- */
      const listaCollegata =
        issue.lista &&
        issue.lista.map((item, index) => {
          console.log("itam " + index + ": ", item);
          return (
            <li key={index + item} className="collection-item">
              {lista.filter(itemLI => itemLI.id === item)[0].title}
            </li>
          );
        });

      const done = issueId + "Done";
      if (!auth.uid) return <Redirect to="/signin" />;
      let user = users ? users[issue.authorId] : "";

      return (
        <div className="container section issue-details">
          <div className="card z-depth-0">
            <div className="card-content">
              <span className="grey-text">{issue.tipo}</span>
              <span className="card-title">{issue.title}</span>
              <p>{issue.content}</p>
              <ul className="collection">{listaCollegata}</ul> {/*QUI INSERISCO LA*/}
            </div>
            <DoneIssue issue={issue} lista={lista} id={done} idIssue={issueId} tipo={issue.tipo} render={() => this.render} />

            <div className="card-action">
              <button data-target={done} className="btn green white-text modal-trigger">
                Risolvi
              </button>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div>
                Posted by {user.firstName} {user.lastName}
              </div>
              <div>{moment(issue.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container center">
          <h1>Loading ...</h1>
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
    usecase: state.firestore.ordered.usecase
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "usecase", orderBy: ["createdAt", "desc"] }])
)(issueDetails);
