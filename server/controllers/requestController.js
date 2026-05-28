const Request = require('../models/Request');
const Donation = require('../models/Donation');

// @desc    Create new request
// @route   POST /api/requests
// @access  Private (Receiver)
exports.createRequest = async (req, res, next) => {
  try {
    const { donationId, message } = req.body;

    const donation = await Donation.findById(donationId);

    if (!donation) {
      return res.status(404).json({
        success: false,
        error: 'Donation not found',
      });
    }

    if (donation.status !== 'available') {
      return res.status(400).json({
        success: false,
        error: 'Food is no longer available',
      });
    }

    const request = await Request.create({
      donation: donationId,
      receiver: req.user.id,
      donor: donation.donor,
      message,
    });

    // Update donation status
    donation.status = 'requested';
    await donation.save();

    res.status(201).json({
      success: true,
      data: request,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get receiver's request history
// @route   GET /api/requests/my-requests
// @access  Private (Receiver)
exports.getMyRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({ receiver: req.user.id })
      .populate('donation')
      .populate('donor', 'name email phone')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get donor's received requests
// @route   GET /api/requests/received
// @access  Private (Donor)
exports.getReceivedRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({ donor: req.user.id })
      .populate('donation')
      .populate('receiver', 'name email phone')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Update request status
// @route   PUT /api/requests/:id
// @access  Private (Donor/Admin)
exports.updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    let request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        error: 'Request not found',
      });
    }

    // Make sure user is request donor or admin
    if (request.donor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        error: 'User not authorized to update this request',
      });
    }

    request.status = status;
    await request.save();

    // If approved/completed, update donation status
    if (status === 'completed') {
      const donation = await Donation.findById(request.donation);
      donation.status = 'delivered';
      await donation.save();
    } else if (status === 'rejected') {
      const donation = await Donation.findById(request.donation);
      donation.status = 'available';
      await donation.save();
    }

    res.status(200).json({
      success: true,
      data: request,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
