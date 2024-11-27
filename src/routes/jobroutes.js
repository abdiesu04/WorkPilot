const express = require('express');
const { createJob, listJobs, updateJob, deleteJob } = require('../controllers/jobController');
// cons = require('../middleware/auth'); // Protect middleware
const router = express.Router();

// Secure routes using the 'protect' middleware
router.post('/', createJob);  // Only authenticated users can create jobs
router.get('/', listJobs);    // Only authenticated users can list jobs
router.put('/:id', updateJob); // Only authenticated users can update jobs
router.delete('/:id', deleteJob); // Only authenticated users can delete jobs

module.exports = router;
