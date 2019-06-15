const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const Auth = require('./Auth')

module.exports = {
    async list(req, res) {

    },

    async create(req, res) {
        const {nome, email, senha, senhac} = req.body
        var erros = []
        if (email == "" || typeof email == null || email == undefined) {
            erros.push({msg: `E-Mail deve ser Informado`})
        }
        if (senha == "" || typeof senha == null || senha == undefined) {
            erros.push({msg: `A Senha deve ser Informada`})
        }
        if (String(senha).length < 6 ) {
            erros.push({msg: `A Senha precisa ter mais de 6 caracteres`})
        }
        if (senha != senhac) {
            erros.push({ msg: `Deve informar Senhas iguais` })
        }
        if (nome == "" || typeof nome == null || nome == undefined) {
            erros.push({ msg: `Informe ao menos seu Primeiro Nome` })
        }
        if (erros.length > 0 ) {
            res.render('user/register', {erros:erros})
        } else {
            Usuario.findOne({email:email},{})
                .then((user) => {
                    if (user) {
                        req.flash('error_msg', `Este E-Mail já está cadastrado.`)
                        res.redirect('/user/register')
                    } else {
                        //Prepare Obj
                        const newUser = new Usuario({
                            email: email,
                            senha: senha,
                            nome: nome
                        })

                        //BCrypt
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.senha, salt, (erro, hash) => {
                                if (erro) {
                                    req.flash('fail_msg', `Erro nos ajustes do Usuário. Tente novamente mais tarde`)
                                    console.log("Erro ao Encriptar= " + erro)
                                    res.redirect('/')
                                }
                                //Inserindo Hash na Senha
                                newUser.senha = hash
                                //Criando Usuario propriamente dito
                                newUser.save()
                                    .then(() => {
                                        req.flash('suc_msg', `Usuário cadastrado com Sucesso`)
                                        res.redirect('/user/login')
                                    })
                                    .catch((err) => {
                                        req.flash('error_msg', `Houve um erro ao Cadastrar o Usuário. Tente novamente mais tarde`)
                                        res.redirect('/user/register')
                                        console.log(err)
                                    })
                            })
                        })//Fim Bcrypt

                        
                    }
                })
        }
    },

    async edit(req, res) {

    }
}