const express = require('express');
const {
  createRequest,
  getMyRequests,
  getReceivedRequests,
  updateRequestStatus,
} = require('../controllers/requestController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(protect, authorize('receiver', 'admin'), createRequest);

router.get('/my-requests', protect, authorize('receiver', 'admin'), getMyRequests);
router.get('/received', protect, authorize('donor', 'admin'), getReceivedRequests);

router
  .route('/:id')
  .put(protect, authorize('donor', 'admin'), updateRequestStatus);

module.exports = router;
