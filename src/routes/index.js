const { Router } = require('express');
const usersRoutes = require('./usersRoutes');
const authRoutes = require('./authRoutes');
const authController = require('../controllers/authController');
const CustomError = require('../utils/customError');

const router = new Router();

// Custom Routes
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);

// Default Routes
router.get('/', (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'OK',
  });
});

// 404 Not Found
router.all('*', (req, res, next) => {
  return next(new CustomError('Not found', 'fail', 404));
});

module.exports = router;
