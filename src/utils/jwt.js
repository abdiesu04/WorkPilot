const jwt = require('jsonwebtoken');

// Function to generate token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Function to extract userId from token
const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;  // Make sure 'id' is the key that contains the user ID in the payload
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = { generateToken, getUserIdFromToken };
