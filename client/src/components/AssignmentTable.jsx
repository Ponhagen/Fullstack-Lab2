import React, { useEffect, useState } from 'react';

export const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/project_assignments')
      .then(res => res.json())
      .then(data => setAssignments(data))
      .catch(err => console.error('Fel vid hämtning av assignments:', err));
  }, []);

  return (
    <section style={{ padding: '1rem' }}>
      <h2>Projektuppdrag</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Anställd</th>
            <th>Projekt</th>
            <th>Startdatum</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(a => (
            <tr key={a._id}>
              <td>{a.employee_id?.full_name || 'N/A'}</td>
              <td>{a.project_code?.project_name || 'N/A'}</td>
              <td>{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
