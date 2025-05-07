const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignmentRoutes');

router.post('/', async (req, res) => {
    const { employee_id, project_code, start_date } = req.body;

    if (!employee_id || !project_code || !start_date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newAssignment = new Assignment({
            employee_id,
            project_code,
            start_date
        });

        const savedAssignment = await newAssignment.save();
        res.status(201).json(savedAssignment);
    } catch (error) {
            console.error('Error creating assignment:', error);
        }
    });

module.exports = router;