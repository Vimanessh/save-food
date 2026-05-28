const User = require('../models/User');
const Donation = require('../models/Donation');
const Request = require('../models/Request');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('-createdAt');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getStats = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const donationCount = await Donation.countDocuments();
    const requestCount = await Request.countDocuments();

    res.status(200).json({
      success: true,
      data: {
        users: userCount,
        donations: donationCount,
        requests: requestCount,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
