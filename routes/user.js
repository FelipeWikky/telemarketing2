const express = require('express')
const router = express.Router()
const UserController = require('../Controller/UserController')
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const {isLogin} = require('../helpers/access')

router.get('/', isLogin, (req, res) => {
    res.render('user/index',{user:req.user})
})

router.get('/register', (req, res) => {
    res.render('user/register')
})

router.post('/register', UserController.create)

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.post('/login', (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next)

})

router.get('/logout', isLogin, (req, res) => {
    if (req.user) {
        req.logOut()
        req.flash('suc_msg', `Deslogado com Sucesso`)
    }
    res.redirect('/')
    
})

router.post('/update', isLogin, (req, res) => {
    Usuario.findOne( {_id: req.user._id} )
        .then((user) => {
            user.nome = req.body.nome
            user.save()
                .then(() => {
                    req.flash('suc_msg', `Seus Dados foram Atualizados.`)
                    res.redirect('/user')
                })
                .catch((err) => {
                    req.flash('error_msg', `Erro ao Confirmar Alterações do Usuário`)
                    res.redirect('/user')
                    console.log('Error no Update-Rota user = ' + err)
                })
        })
        .catch((err)=> {
            req.flash('error_msg', `Erro ao Buscar o Usuário para alterações. Tente novamente mais Tarde`)
            res.redirect('/user')
            console.log('Error ao Buscar Usuário para inciar alterações = ' + err)
        })
})

module.exports = router