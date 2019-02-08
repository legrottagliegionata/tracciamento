import React, { Component } from "react";
import moment from "moment";
import "moment/locale/it";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class IssueSummary extends Component {
  render() {
    const { issueId, usecase } = this.props;

    moment.locale("it");
    const issue = usecase && usecase.filter(item => item.id === issueId)[0];
    return (
      <div className="card sticky-action z-depth-0 mt-0">
        <Link to={"/issue/" + issue.id} className="block card-content grey-text text-darken-3">
          <span className="grey-text">{issue.tipo}</span>
          <span className="card-title truncate">{issue.title}</span>
          <span>
            <ul className="collection">
              {issue.lista &&
                issue.lista.map(item => {
                  return (
                    <li key={item} className="collection-item">
                      {usecase.filter(l => l.id === item)[0] && usecase.filter(l => l.id === item)[0].title}
                    </li>
                  );
                })}
            </ul>
          </span>
        </Link>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(IssueSummary);
