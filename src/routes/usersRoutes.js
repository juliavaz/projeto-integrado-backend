const { Router } = require('express');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = new Router();

// User routes
router.post('/', authController.requireLogin, authController.requireRoles('admin'), usersController.create);
router.get('/', authController.requireLogin, authController.requireRoles('admin'), usersController.retrieve);
router.get('/:id', authController.requireLogin, authController.requireRoles('admin'), usersController.retrieveOne);
router.patch('/:id', authController.requireLogin, authController.requireRoles('admin'), usersController.update);
router.delete('/:id', authController.requireLogin, authController.requireRoles('admin'), usersController.delete);

module.exports = router;
