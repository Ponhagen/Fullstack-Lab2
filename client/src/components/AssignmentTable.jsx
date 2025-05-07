import React from 'react';

export const AssignmentTable = ({ assignments }) => {
  return (
    <div>
      <h2>Latest project assignment</h2>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Name</th>
            <th>Project</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {[...assignments]
            .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
            .slice(0, 5)
            .map((a) => (
              <tr key={a._id}>
                <td>{a.employee_id?.employee_id}</td>
                <td>{a.employee_id?.full_name}</td>
                <td>{a.project_code?.project_name}</td>
                <td>{new Date(a.start_date).toLocaleDateString()}</td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
