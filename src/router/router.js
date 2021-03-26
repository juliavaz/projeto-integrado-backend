const collections = require('./collections');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.status(200).json({ status: 'Backend funcional, API está OK.' });
  });

  // Carrega as rotas de acesso do Módulo de Usuários
  app.use('/usuario', collections.usuario);

  // Carrega as rotas de acesso do Módulo de Autenticação
  app.use('/auth', collections.autenticacao);

  // Catch all
  app.use('*', (req, res) => {
    res.status(404).json({ erro: 'O caminho não existe.' });
  });
};
