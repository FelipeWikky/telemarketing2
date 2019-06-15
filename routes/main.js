const express = require('express')
const router = express.Router()






router.get('/teamo', (req, res) => {
    res.render('teamo')
})

module.exports = router