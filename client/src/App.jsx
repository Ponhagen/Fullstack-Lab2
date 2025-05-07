import React from 'react';
import { Header } from './components/header';
import { AssignmentForm } from './components/assignmentForm';
import { AssignmentTable } from './components/assignmentTable';

function App() {
  return (
    <div>
      <Header />
      <AssignmentForm onAssignmentCreated={() => {}} />
      <AssignmentTable />
    </div>
  );
}

export default App;
