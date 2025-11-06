
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


const generateToken = (id) => {
  
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallbacksecret123', {
    expiresIn: process.env.JWT_EXPIRE || '30d', 
  });
};



exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    user = await User.create({
      name,
      email,
      password, 
    });

    
    const token = generateToken(user._id);
    res.status(201).json({ success: true, token, userId: user._id, name: user.name });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = generateToken(user._id);
    res.status(200).json({ success: true, token, userId: user._id, name: user.name });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};