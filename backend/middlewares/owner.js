const owner = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ msg: 'Access denied, only book owners can perform this action' });
  }
  next();
};

module.exports = owner; 