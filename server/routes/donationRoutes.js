const express = require('express');
const {
  getDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,
  getMyDonations,
} = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router
  .route('/')
  .get(getDonations)
  .post(protect, authorize('donor', 'admin'), upload.single('image'), createDonation);

router.get('/my-donations', protect, authorize('donor', 'admin'), getMyDonations);

router
  .route('/:id')
  .get(getDonation)
  .put(protect, authorize('donor', 'admin'), updateDonation)
  .delete(protect, authorize('donor', 'admin'), deleteDonation);

module.exports = router;
