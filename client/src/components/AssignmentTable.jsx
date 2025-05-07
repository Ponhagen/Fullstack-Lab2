import React, { useEffect, useState } from 'react';

export function AssignmentTable() {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/project_assignments')
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error('Error fetching assignments:', err));
  }, []);

  return (
    <div>
      <h2>Projectassignment</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Project Code</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a._id}>
              <td>{a.employee_id}</td>
              <td>{a.project_code}</td>
              <td>{a.start_date?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
