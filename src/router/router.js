module.exports = function (app) {
  app.get('/', (req, res, next) => {
    res.status(200).json({ status: 'Backend funcional, API está OK.' });
  });

  // Carrega as rotas de acesso do Módulo de Usuários
  app.use('/usuario', require('./collections/usuario'));

  // Carrega as rotas de acesso do Módulo de Autenticação
  app.use('/auth', require('./collections/autenticacao'));

  // Catch all
  app.use('*', (req, res, next) => {
    res.status(404).json({ erro: 'O caminho não existe.' });
  });
};
