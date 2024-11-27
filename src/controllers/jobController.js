const Job = require('../models/Job'); // Renamed to `Job` to match the Mongoose model
const User = require('../models/User'); // Renamed to `User` for consistency
const { getUserIdFromToken } = require('../utils/jwt');

// Create job
const createJob = async (req, res) => {
    try {
      // Extract token from Authorization header
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
      }
  
      // Get user ID from the token
      const userId = getUserIdFromToken(token);
      if (!userId) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      // Extract job data from request body
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
      }
  
      // Create a new job associated with the user ID
      const newJob = new Job({ title, description, user: userId });
  
      // Save the job to the database
      const savedJob = await newJob.save();
  
      // Respond with the created job
      res.status(201).json({ job: savedJob });
  
    } catch (error) {
      console.error('Error creating job:', error); // Log the error for debugging
      res.status(500).json({ error: error.message || 'An error occurred while creating the job.' });
    }
  };
  
// List Jobs
const listJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching jobs.' });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ job });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the job.' });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the job.' });
  }
};

module.exports = { createJob, listJobs, updateJob, deleteJob };
