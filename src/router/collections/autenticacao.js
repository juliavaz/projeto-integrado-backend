const express = require('express');
const ApiResponse = require('../../models/ApiResponse.model')
var router = express.Router();

router.post('/login', function (req, res) {
    // Não faremos autenticação em banco de dados no momento
    // Apenas uma simples validação a titulo de implementacao de login
    const { usuario, senha } = req.body;
    if (usuario === 'admin' && senha === 'admin') {
        let resposta = new ApiResponse("sucesso", "Login realizado com sucesso como administrador.", "jwt token vai aqui");
        return res.status(200).json(resposta);
    }
    if (usuario === 'usuario' && senha === 'usuario') {
        let resposta = new ApiResponse("sucesso", "Login realizado com sucesso como usuario.", "jwt token vai aqui");
        return res.status(200).json(resposta);
    }
    return res.status(200).json({"erro": "Login inválido."})
});

module.exports = router;