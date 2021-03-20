const mongoose = require('mongoose');

const tableName = '';

const url = `mongodb://localhost:27017/${tableName}`;

const connection = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = connection;
