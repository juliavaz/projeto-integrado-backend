const { Router } = require('express');
const consultasController = require('../controllers/consultasController');
const authController = require('../controllers/authController');

const router = new Router();

// Consultas routes
router.use(authController.requireLogin, authController.requireRoles('admin'));

router.post('/', consultasController.create);
router.get('/', consultasController.retrieve);
router.get('/:id', consultasController.retrieveOne);
router.delete('/:id', consultasController.delete);

module.exports = router;
