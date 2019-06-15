const express = require('express')
const router = express.Router()
const UserController = require('../Controller/UserController')

router.get('/', (req, res) => {
    res.render('user/index')
})

router.get('/login', (req, res) => {
    res.render('user/login')
})

router.get('/register', (req, res) => {
    res.render('user/register')
})

router.post('/register', UserController.create)

module.exports = router