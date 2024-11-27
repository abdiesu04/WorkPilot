const express = require('express');
const user = require('../models/User');
const generateToken = require('../utils/jwt');
const router = express.Router();

// Register route (no authentication needed)
router.post('/register', async (req, res) => {
  console.log("hi")
  const { username, email, password } = req.body;

  try {
    const newUser = new user({
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).send('User registered successfully!');
  } catch (error) {
    res.status(400).send(error.message); // Handle validation errors
  }
});

// Login route (no authentication needed)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundUser = await user.findOne({ username });

    // Check if user exists and if password matches
    if (!foundUser || !await foundUser.matchPassword(password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = generateToken({ id: foundUser._id });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error processing request' });
  }
});

module.exports = router;
