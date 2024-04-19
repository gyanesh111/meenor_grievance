const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

exports.authenticate = async (req, res, next) => {
  try {
    // Check if the token is provided in the request cookies
    const token = req.cookies.jwtoken;

    // If token is not provided, return an error
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Access Denied' });
    }

    // Verify the token
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user based on the decoded token
    const user = await User.findOne({ _id: verifiedToken._id });

    // If user not found, return an error
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - Access Denied' });
    }

    // Attach the user object to the request for further use
    req.user = user;

    // Call the next middleware
    next();
  } catch (err) {
    // If token verification fails, return an error
    res.status(401).json({ error: 'Unauthorized - Access Denied' });
  }
}; 
