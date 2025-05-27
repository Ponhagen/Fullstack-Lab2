import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { AssignmentForm } from './components/AssignmentForm';
import { AssignmentTable } from './components/AssignmentTable';

function App() {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/project_assignments');
      const data = await res.json();
      setAssignments(data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    fetchAssignments(); // Hämta vid start
  }, []);

  return (
    <div>
      <Header />
      <AssignmentForm onAssignmentCreated={fetchAssignments} />
      <AssignmentTable assignments={assignments} />
    </div>
  );
}

export default App;
