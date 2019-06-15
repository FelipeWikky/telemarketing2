const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categoria')
const CategoriaController = require('../Controller/CategController')
const FuncionarioController = require('../Controller/FuncController')
const Funcionario = require('../models/Funcionario')

router.get('/', (req, res) => {
    res.render('cad/index')
})

router.get('/funcionario', (req, res) => {
    Categoria.find().sort('-createdAd')
        .then( (cats) => {
            Funcionario.find().populate('categoria').sort('-createdAt')
                .then((funcs) => {
                    res.render('cad/funcionario', { cats: cats, funcs:funcs })
                })
            
        }) 
        .catch((err) => console.log(err))
    })

router.post('/funcionario', FuncionarioController.create)

router.get('/categoria', (req, res) => {
    Categoria.find().sort('-createdAd')
        .then( (categorias) => {
            res.render('cad/categoria', {categs:categorias})
        })
})

router.post('/categoria', CategoriaController.create)
/*router.post('/categoria', (req, res) => {
    console.log(req.body.nome)
    console.log(req.body.salario)
    res.render('cad/categoria')
})*/



module.exports = router