const express = require('express');
const router = express.Router();
const employee = require('../models/employee');

// Get function to fetch all employees
router.get('/' , async (req, res) => {
    try {
        const employees = await employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// post - create a new employee
router.post('/', async (req, res) => {
    const { employee_id, full_name, email, hashed_password } = req.body;

    if (!employee_id || !full_name || !email || !hashed_password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

try {
    const newEmployee = new employee({
        employee_id,
        full_name,
        email,
        hashed_password
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
}

});

module.exports = router;