const express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.status(200).json({"acesso": "usuario"});
});

module.exports = router;