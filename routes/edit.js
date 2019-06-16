const express = require('express')
const router = express.Router()
const FuncionarioController = require('../Controller/FuncController')
const UserController = require('../Controller/UserController')
const CategController = require('../Controller/CategController')
const Categoria = require('../models/Categoria')

router.post('/funcionario', FuncionarioController.edit)

router.post('/usuario', UserController.edit)

router.get('/categoria/:uid', (req, res)=> {
    Categoria.findOne({_id: req.params.uid})
        .then((categ) => {
            res.render('edit/categoria', {categ:categ})
        })
})
router.post('/categoria', CategController.edit)


module.exports = router