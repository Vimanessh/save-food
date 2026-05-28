const Donation = require('../models/Donation');

// @desc    Get all donations
// @route   GET /api/donations
// @access  Public
exports.getDonations = async (req, res, next) => {
  try {
    const { city, foodType, search, all } = req.query;
    let query = {};

    // If 'all' is not present, only show available donations
    if (!all) {
      query.status = 'available';
    }

    if (city) {
      query.pickupAddress = { $regex: city, $options: 'i' };
    }
    if (foodType) {
      query.foodType = foodType;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const donations = await Donation.find(query).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get single donation
// @route   GET /api/donations/:id
// @access  Public
exports.getDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found',
      });
    }

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Create new donation
// @route   POST /api/donations
// @access  Private (Donor)
exports.createDonation = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.donor = req.user.id;

    // Handle image upload
    if (req.file) {
      req.body.image = req.file.path;
    }

    const donation = await Donation.create(req.body);

    res.status(201).json({
      success: true,
      data: donation,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Update donation
// @route   PUT /api/donations/:id
// @access  Private (Donor/Admin)
exports.updateDonation = async (req, res, next) => {
  try {
    let donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found',
      });
    }

    // Make sure user is donation owner
    if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'User not authorized to update this donation',
      });
    }

    donation = await Donation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: donation,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Delete donation
// @route   DELETE /api/donations/:id
// @access  Private (Donor/Admin)
exports.deleteDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found',
      });
    }

    // Make sure user is donation owner
    if (donation.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'User not authorized to delete this donation',
      });
    }

    await donation.deleteOne();

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

// @desc    Get donations by donor
// @route   GET /api/donations/my-donations
// @access  Private (Donor)
exports.getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.user.id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      count: donations.length,
      data: donations,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
