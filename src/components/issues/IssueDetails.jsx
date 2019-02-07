import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import DoneIssue from "./DoneIssue";
import moment from "moment";
const issueDetails = props => {
  const { issue, auth, users, usecase, id } = props;

  if (issue) {
    const lista = usecase.filter(item => item.tipo !== issue.tipo);
    const done = id + "Done";
    if (!auth.uid) return <Redirect to="/signin" />;
    let user = users ? users[issue.authorId] : "";
    return (
      <div className="container section issue-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="grey-text">{issue.tipo}</span>
            <span className="card-title">{issue.title}</span>
            <p>{issue.content}</p>
            <ul className="collection">
              {issue.lista &&
                issue.lista.map(item => {
                  return (
                    <li key={item} className="collection-item">
                      {usecase.filter(l => l.id === item)[0].title}
                    </li>
                  );
                })}
            </ul>
          </div>
          <DoneIssue issue={issue} lista={lista} id={done} idIssue={id} tipo={issue.tipo} />
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
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const requisiti = state.firestore.data.requisiti;
  const usecase = state.firestore.data.usecase;
  let issue = requisiti ? requisiti[id] : null;
  if (!issue && usecase) issue = usecase[id];

  return {
    id: id,
    issue: issue,
    auth: state.firebase.auth,
    users: state.firestore.data.users,
    usecase: state.firestore.ordered.usecase
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "issues" }, { collection: "usecase", orderBy: ["createdAt", "desc"] }, { collection: "users" }])
)(issueDetails);
