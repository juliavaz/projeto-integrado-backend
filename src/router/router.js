module.exports = function(app) {

    app.get('/', function (req, res, next) {
        res.status(200).json({"status": "Backend funcional, API está OK."});
    });

    app.use('/usuario', require('./collections/usuario'));
    app.use('/auth', require('./collections/autenticacao'));
    
    // Catch all
    app.use('*', function (req, res, next){
        res.status(404).json({"erro": "O caminho não existe."});
    });
};