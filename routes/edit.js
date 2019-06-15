const express = require('express')
const router = express.Router()
const FuncionarioController = require('../Controller/FuncController')
const UserController = require('../Controller/UserController')

router.post('/funcionario', FuncionarioController.edit)

router.post('/usuario', UserController.edit)

module.exports = router