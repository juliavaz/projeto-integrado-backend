const { Router } = require('express');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = new Router();

// User routes
router.use(authController.requireLogin, authController.requireRoles('admin'));

router.post('/', usersController.create);
router.get('/', usersController.retrieve);
router.get('/:id', usersController.retrieveOne);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;
