const express = require('express')
const router = express.Router()
const FuncController = require('../Controller/FuncController')
const CategController = require('../Controller/CategController')
const UserController = require('../Controller/UserController')

// {/dev/delete/funcionario}
router.get('/funcionario/:uid', FuncController.delete)

router.get('/categoria/:uid', CategController.delete)

router.get('/usuario/:uid', UserController.delete)

module.exports = router