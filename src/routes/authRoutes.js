const { Router } = require('express');
const authController = require('../controllers/authController');

const router = new Router();

// Auth routes
router.post('/signup', authController.signup);
// TODO: implement account activation step after signup
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.patch('/change-password', authController.requireLogin, authController.changePassword);
router.delete('/delete-account', authController.requireLogin, authController.deleteMe);

module.exports = router;