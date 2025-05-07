const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.post('/', async (req, res) => {
    const {project_code, project_name, project_description} = req.body;

    if (!project_code || !project_name) {
        return res.status(400).json({ message: 'project_code and project_name is needed' });
      }

      try {
        const newProject = new Project({
            project_code,
            project_name,
            project_description
        });
        
        const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
    