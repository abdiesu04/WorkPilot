const job = require('../models/Job');
const user = require('../models/User');

// create job


const createJob = async (req, res) => {
    try {
        const { title, description } = req.body;
        const job = await job.create({ title, description, user: req.user._id });
        res.status(201).json({ job });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the job.' });
    }
};

// List Jobs

const listJobs = async (req, res) => {
    const jobs = await job.find();
    res.json({ jobs });

}


// update job

const  updateJob = async (req, res) => {
    const job = await job.findByIdAndUpdate(req.params.id, req.body , { new: true });
    if (!job) {
        res.status(404).json({ error: 'Job not found' });
    }
    res.json({ job });
}

// delete job

const deleteJob = async (req, res) => {
    const job = await job.findByIdAndDelete(req.params.id);
    if (!job) {
        res.status(404).json({ error: 'Job not found' });
    }
    res.json({message: 'Job deleted successfully'});
}


module.exports = { createJob, listJobs, updateJob, deleteJob };