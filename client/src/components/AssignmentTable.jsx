import React, { useEffect, useState } from 'react';

export const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortBy, setSortBy] = useState('start_date');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchAssignments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/project_assignments');
      const data = await response.json();

      // Sortera and limit to the latest 5 assignments

      const sorted = [...data].sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });

      setAssignments(sorted.slice(0, 5));
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments();

    const interval = setInterval(() => {
      fetchAssignments();
    }, 60000);                 // 60 seconds update interval
    return () => clearInterval(interval);
  }, [sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <h2>Latest projectassignment</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort('employee_id')}>Employee</th>
            <th onClick={() => toggleSort('employee_id.full_name')}>Name</th>
            <th onClick={() => toggleSort('project_code.project_name')}>Project</th>
            <th onClick={() => toggleSort('start_date')}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((a) => (
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
