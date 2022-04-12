import React from "react";

const BugTable = (props) => {
  const { bugs, onDeleteBug } = props;
  const resolvedPressed = (id) => {
    onDeleteBug(id);
  };

  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th>Description</th>
          <th>Priority</th>
          <th>Assigned To</th>
          <th>Created By</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {bugs.length === 0 && (
          <tr>
            <td>No Bugs Found</td>
          </tr>
        )}
        {bugs.length > 0 &&
          bugs.map((bug) => (
            <tr key={bug.key}>
              <td>{bug.description}</td>
              <td>{bug.priority}</td>
              <td>{bug.assignedTo}</td>
              <td>{bug.createBy}</td>
              <td>
                <button onClick={() => resolvedPressed(bug.key)}>
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
