const { Router } = require('express');
const usersRoutes = require('./usersRoutes');
const authRoutes = require('./authRoutes');
const CustomError = require('../utils/customError');
const especialidadesRoutes = require('./especialidadesRoutes');
const consultasRoutes = require('./consultasRoutes');

const router = new Router();

// Custom Routes
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/especialidades', especialidadesRoutes);
router.use('/consultas', consultasRoutes);

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
