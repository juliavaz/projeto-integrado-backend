const mongoose = require('mongoose');

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    return console.log('Connection to MongoDB successfully established.');
  } catch (err) {
    return console.log('Unable to connect to database.');
  }
};
