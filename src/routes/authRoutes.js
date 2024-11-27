const express = require('express');
const user = require('../models/User');
const generateToken = require('../utils/jwt');
const router = express.Router();

// Register route (no authentication needed)
router.post('/register', async (req, res) => {
  console.log(req.body , req.headers , "hi")
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


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const foundUser = await user.findOne({ username });
  
      // Validate user and password
      if (!foundUser || !await foundUser.matchPassword(password)) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token
      const token = generateToken({ id: foundUser._id });
  
      // Set the token in the response header
      res.setHeader('Authorization', `Bearer ${token}`);
      res.setHeader('user', foundUser._id);
  
      // Send response with token in header and body (optional)
      console.log(token)
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Error processing login request' });
    }
  });
  

module.exports = router;
