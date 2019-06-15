const express = require('express')
const router = express.Router()
const FuncionarioController = require('../Controller/FuncController')

router.post('/funcionario', FuncionarioController.edit)


module.exports = router