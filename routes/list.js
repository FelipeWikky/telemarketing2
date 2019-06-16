const express = require('express')
const router = express.Router()
const Categoria = require('../models/Categoria')
const Funcionario = require('../models/Funcionario')

router.get('/', (req, res) => {
    res.redirect('/404')
})

router.get('/funcionario', (req, res) => {
    Funcionario.find().populate('categoria').sort('-createdAt')
        .then((funcs) => {
            res.render('list/funcionario', { funcs: funcs })
        })
})

router.get('/categoria', (req, res) => {
    Categoria.find().sort('-createdAt')
        .then((categs) => {
            res.render('list/categoria', { categs: categs})
        })
})

module.exports = router