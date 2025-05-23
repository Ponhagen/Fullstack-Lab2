const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employees', employeeRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

const assignmentRoutes = require('./routes/assignmentRoutes');
app.use('/api/project_assignments', assignmentRoutes);


app.get('/', (req, res) => {
  res.send('Server is running');
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

