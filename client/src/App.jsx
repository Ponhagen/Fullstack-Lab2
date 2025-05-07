import React, { useState } from 'react';
import { Header } from './components/header';
import { AssignmentForm } from './components/assignmentForm';
import { AssignmentTable } from './components/assignmentTable';

function App() {
  const [reload, setReload] = useState(false);

  const refreshAssignments = () => {
    setReload(prev => !prev); // trigger uppdate in tabel
  };

  return (
    <div>
      <Header />
      <AssignmentForm onAssignmentCreated={refreshAssignments} />
      <AssignmentTable key={reload} />
    </div>
  );
}

export default App;
