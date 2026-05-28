const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing users
    await User.deleteMany();

    const users = [
      {
        name: 'Admin User',
        email: 'admin@savefood.com',
        password: 'password123',
        role: 'admin',
        phone: '1234567890',
        address: 'Admin Street, HQ'
      },
      {
        name: 'John Donor',
        email: 'donor@savefood.com',
        password: 'password123',
        role: 'donor',
        phone: '9876543210',
        address: 'Donor Lane, Food City'
      },
      {
        name: 'Sarah Receiver',
        email: 'receiver@savefood.com',
        password: 'password123',
        role: 'receiver',
        phone: '5556667777',
        address: 'Receiver Road, Hope City'
      }
    ];

    for (const u of users) {
      await User.create(u);
    }

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();
