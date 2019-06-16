const express = require('express')
const router = express.Router()
const Funcionario = require('../models/Funcionario')

router.post('/', (req, res) => {
    Funcionario.find({ matricula: req.body.search }).populate('categoria')
        .then((func) => {
            //console.log(func)
            if (func) {
                res.render('other/search', { func: func })
            } else {
                res.render('other/search')
            }
        })
})

router.get('/', (req, res) => {
    res.render('other/search')
})

module.exports = router