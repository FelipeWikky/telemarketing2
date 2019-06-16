const express = require('express')
const router = express.Router()
const UserController = require('../Controller/UserController')

router.get('/', (req, res) => res.render('dev/index'))

router.use('/cad', require('./cadastro')) //Cadastro
router.use('/edit', require('./edit')) //Edição
router.use('/info', require('./info')) //List - Info
router.use('/delete', require('./delete')) //Deleta

router.get('/usuarios', (req, res) => res.redirect('/dev/usuario'))
router.get('/usuario', UserController.list)
router.post('/usuario', UserController.edit)

module.exports = router