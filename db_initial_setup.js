require('dotenv').config();
const db = require('./src/db/mongodb');
const User = require('./src/models/userModel');

db.connect();

const createFirstUser = async () => {
  try {
    const newUser = await User.create({
      username: 'admin',
      password: 'admin',
      role: 'admin',
    });

    if (newUser) {
      console.log('Initial user has been set up successfully.');
    }
  } catch (err) {
    console.log('Unable to setup first user.');
  } finally {
    process.exit(0);
  }
};

createFirstUser();
