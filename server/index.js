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




app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

