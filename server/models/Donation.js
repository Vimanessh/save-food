const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  quantity: {
    type: String,
    required: [true, 'Please add quantity'],
  },
  foodType: {
    type: String,
    enum: ['veg', 'non-veg'],
    required: [true, 'Please add food type'],
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please add expiry date'],
  },
  pickupAddress: {
    type: String,
    required: [true, 'Please add pickup address'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Please add contact number'],
  },
  donorName: {
    type: String,
    required: [true, 'Please add donor name'],
  },
  image: {
    type: String,
    default: 'no-photo.jpg',
  },
  donor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'requested', 'delivered'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donation', donationSchema);
