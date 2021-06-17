const { Router } = require('express');
const especialidadesController = require('../controllers/especialidadesController');
const authController = require('../controllers/authController');

const router = new Router();

// Consultas routes
router.use(authController.requireLogin, authController.requireRoles('admin'));

router.post('/', especialidadesController.create);
router.get('/', especialidadesController.retrieve);
router.get('/:id', especialidadesController.retrieveOne);
router.patch('/:id', especialidadesController.update);
router.delete('/:id', especialidadesController.delete);

module.exports = router;
