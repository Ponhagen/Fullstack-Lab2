const express = require('express');
const router = express.Router();
const Assignment = require('../models/ProjectAssignment');


// Get function to fetch all assignments
router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find().populate('employee_id').populate('project_code');
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Post function to create a new assignment
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