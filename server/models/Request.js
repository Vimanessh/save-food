const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  donation: {
    type: mongoose.Schema.ObjectId,
    ref: 'Donation',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  donor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending',
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Request', requestSchema);
