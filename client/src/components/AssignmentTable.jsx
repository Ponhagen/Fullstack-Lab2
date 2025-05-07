import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/project_assignments');
        setAssignments(res.data);
      } catch (err) {
        console.error('Error fetching assignments:', err);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Projektuppgifter</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Anställd ID</th>
            <th>Projekt ID</th>
            <th>Startdatum</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
            <tr key={a._id}>
              <td>{a.employee_id}</td>
              <td>{a.project_code}</td>
              <td>{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
