const Consulta = require('../models/consultaModel');
const User = require('../models/userModel');
const factory = require('../utils/factory');
const CustomError = require('../utils/customError');

exports.create = async (req, res, next) => {
    try {
        // Valida se req.body.paciente nao eh igual o req.body.medico
        if (req.body.paciente === req.body.medico) {
            return res.status(400).json({
                status: 'fail',
                message: 'Paciente e medico nao podem ser a mesma pessoa.'
            })
        }

        // Verifica se os usuarios existem no banco de dados. Caso contrario retorna erro
        const paciente = await User.findById(req.body.paciente);
        const medico = await User.findById(req.body.medico);

        if (!paciente || !medico) {
            console.log('chegamos aqui');
            return next(new CustomError('Usuário(s) inválido(s). Médico ou paciente nao existe(m).', 'fail', 400));
        }

        // Valida se o medico realmente eh medico. A consulta nao pode ser realizada 
        if (medico.role !== 'medico') {
            return next(new CustomError('Uma consulta so pode ser realizada por um medico.', 'fail', 400));
        }

        // Valida se nao existe consulta do mesmo medico, no mesmo horario com outro paciente
                
        
        // Valida se nao existe consulta do mesmo paciente, no mesmo horario com outro medico
    
        // Se der tudo certo, cria a consulta e retorna ok pro usuario
        const consulta = await Consulta.create(req.body);
        return res.status(200).json({
            status: 'success',
            consulta: consulta
        });
    } catch (err) {
        return next(err);
    }
};
exports.retrieve = factory.retrieve(Consulta);
exports.retrieveOne = factory.retrieveOne(Consulta);
exports.update = factory.update(Consulta);
exports.delete = factory.delete(Consulta);