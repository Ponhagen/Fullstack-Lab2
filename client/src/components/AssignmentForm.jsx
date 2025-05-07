import { useEffect, useState } from 'react';

export function AssignmentForm({ onAssignmentCreated }) {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    employee_id: '',
    project_code: '',
    start_date: ''
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/employees')
      .then(res => res.json())
      .then(data => setEmployees(data));

    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/project_assignments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        onAssignmentCreated(); // uppdate list
        setFormData({ employee_id: '', project_code: '', start_date: '' });
      })
      .catch(err => console.error('Error creating assignment:', err));
  };

  return (
    <section style={{ padding: '1rem' }}>
      <h2>Skapa ny koppling</h2>
      <form onSubmit={handleSubmit}>
        <select name="employee_id" value={formData.employee_id} onChange={handleChange} required>
          <option value="">Choose employee</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp._id}>{emp.full_name}</option>
          ))}
        </select>

        <select name="project_code" value={formData.project_code} onChange={handleChange} required>
          <option value="">Choose project</option>
          {projects.map(proj => (
            <option key={proj._id} value={proj._id}>{proj.project_name}</option>
          ))}
        </select>

        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          required
        />

        <button type="submit">Create connection</button>
      </form>
    </section>
  );
}
