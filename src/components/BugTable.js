import React from "react";

const BugTable = (props) => {
  const { bugs, onDeleteBug, users, onClickAlert } = props;
  const resolvedPressed = (id, targetUser) => {
    const [assignedUser] = users.filter((user) => user.name === targetUser);
    onDeleteBug(id, assignedUser.key);
    onClickAlert();
  };

  return (
    <table
      className="table table-bordered"
      style={{ border: "2px solid gray" }}
    >
      <thead className="table-secondary" style={{ textAlign: "center" }}>
        <tr>
          <th style={{ textAlign: "left" }}>Description</th>
          <th>Priority</th>
          <th>Assigned To:</th>
          <th>Created By:</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="table-light" style={{ textAlign: "center" }}>
        {bugs.length === 0 && (
          <tr>
            <td>No Bugs Found</td>
          </tr>
        )}
        {bugs.length > 0 &&
          bugs.map((bug) => (
            <tr key={bug.key}>
              <td className="description" style={{ textAlign: "left" }}>
                {bug.description}
              </td>
              <td
                className={
                  bug.priority === "Low"
                    ? "bg-success text-white"
                    : bug.priority === "Medium"
                    ? "bg-warning text-white"
                    : "bg-danger text-white"
                }
              >
                {bug.priority}
              </td>
              <td>{bug.assignedTo}</td>
              <td>{bug.createBy}</td>
              <td>
                <button
                  className="resolve-button"
                  onClick={() => resolvedPressed(bug.key, bug.assignedTo)}
                >
                  Resolved
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BugTable;
