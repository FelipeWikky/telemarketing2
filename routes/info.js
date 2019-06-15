const router = require('express').Router()
const Funcionario = require('../models/Funcionario')
const Categoria = require('../models/Categoria')

router.get('/', (req, res) => {
    res.send('Inicial das Infos')
})

router.get('/:mat', (req, res) => {
    Funcionario.findOne({ _id: req.params.mat } ).populate('categoria')
        .then((func) => {
            Categoria.find()
                .then((cats)=> {
                    //console.log(func)
                    res.render(`info/one`, { func: func, cats:cats })
                })
            })
        .catch((err) => {
            res.send('Erro ao buscar informação: ' + err)
        })
})

module.exports = router