const User = require('../models/User');

exports.getAllOwners = async (req, res) => {
  try {
    const owners = await User.find({ role: 'owner' }).select('-password');
    res.json(owners);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getAllSeekers = async (req, res) => {
  try {
    const seekers = await User.find({ role: 'seeker' }).select('-password');
    res.json(seekers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
}; 