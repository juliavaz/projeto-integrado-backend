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

// Metodos para definir e exibir especialidade de um usuario (se ele for medico)
// Como cada medico possui apenas uma especialidade, as rotas e metodos abaixo
// sao mais simples do que os trabalhados em sala.
router.post('/:userid/especialidade', usersController.adicionaEspecialidade);
router.get('/:userid/especialidade', usersController.listaEspecialidade);
// No caso de uma unica especialidade, atualizar eh o mesmo que criar uma nova, pois a antiga eh sobrescrita
router.patch('/:userid/especialidade', usersController.adicionaEspecialidade);
router.delete('/:userid/especialidade', usersController.removeEspecialidade);

module.exports = router;
