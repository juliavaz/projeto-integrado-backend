require('dotenv').config();
const app = require('./app');
const db = require('./db/mongodb');

db.connect();

const server = app.listen(3000, () => {
  console.log('Server is up and listening.');
});
