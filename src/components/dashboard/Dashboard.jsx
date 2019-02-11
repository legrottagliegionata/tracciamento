import React, { Component } from "react";
import IssueList from "../issues/IssueList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
class Dashboard extends Component {
  render() {
    const { usecase, auth, users } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (usecase) {
      const requisiti = usecase.filter(item => item.tipo === "RQ");
      const us = usecase.filter(item => item.tipo === "UC");

      return (
        <div className="dashboard container ">
          <div className="row">
            <div className="col s12 m6 p-0 pb-2 ">
              <IssueList key="Requisiti" usecase={usecase} issues={requisiti} uid={auth.uid} users={users} title="Requisiti" />
            </div>
            <div className="col s12 m6 ">
              <IssueList key="Usecase" usecase={usecase} issues={us} uid={auth.uid} users={users} title="Casi d'uso" />
            </div>
          </div>
        </div>
      );
    } else return "loading";
  }
}

const mapStateToProps = state => {
  return {
    usecase: state.firestore.ordered.usecase,
    auth: state.firebase.auth,
    //notifications: state.firestore.ordered.notifications,
    users: state.firestore.data.users
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: "usecase", orderBy: ["createdAt", "desc"] },
    /*{ collection: "notifications", limit: 3, orderBy: ["time", "desc"] },*/
    { collection: "users" }
  ])
)(Dashboard);
