import React from "react";
import moment from "moment";
import "moment/locale/it";
import { Link } from "react-router-dom";
import DoneIssue from "./DoneIssue";
import ReassignIssue from "./ReassignIssue";
const IssueSummary = props => {
  const { issue, users } = props;

  moment.locale("it");
  let user = users ? users[issue.authorId] : "";
  return (
    <div className="card sticky-action z-depth-0 mt-0">
      <Link to={"/issue/" + issue.id} className="block card-content grey-text text-darken-3">
        <span className="grey-text">{issue.tipo}</span>
        <span className="card-title truncate">{issue.title}</span>
      </Link>
    </div>
  );
};

export default IssueSummary;
