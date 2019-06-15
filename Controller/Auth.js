const localStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario')

module.exports = function (passport) {

    passport.use
        (new localStrategy( {usernameField: 'email'} ), (email, senha, done)=> {
            Usuario.findOne({email: email})
                .then((user) => {
                    if (!user) {
                        return done(null, false, {message: `Esta conta não Existe`})
                    }

                    bcrypt.compare(senha, user.senha, (erro, senhasIguais) => {
                        if (senhasIguais) {
                            return done(null, user)
                        } else{
                            return done (null, false, {message: `Senha incorreta`})
                        }
                    })
                })
        }
    )

    passport.serializeUse( (user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser( (id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, user)
        })
    } )

}