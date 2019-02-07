import React from "react";
import IssueSummary from "./IssueSummary";

const IssueList = ({ issues, uid, users, title, lista }) => {
  console.log(issues);
  if (issues)
    return (
      <div>
        <div className="white lighten-2 py-2 px-3 mt-2">{title}</div>
        <div className=" section section-fixed no-scrollbar mt-0 p-2 pb-0 white-01">
          {issues &&
            issues.map(issue => {
              return <IssueSummary issueId={issue.id} key={issue.id} users={users} />;
            })}
        </div>
      </div>
    );
  else return <div />;
};

export default IssueList;
