const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const rInfo = require('./routes/info')

const url = 'mongodb+srv://wikky:wikky@cluster0-dfnfs.mongodb.net/test?retryWrites=true&w=majority'

//Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//Cors
app.use(cors())
//Mongoose
mongoose.connect(url, {
    useNewUrlParser: true,
})
    .then(() => console.log(`Servidor MongoDB Aberto`))
    .catch((err) => console.log(`Erro ao abrir o Mongo= ${err}`))
//Routes
app.use('/info', rInfo)
app.use('/cad', require('./routes/cadastro'))
app.use('/list', require('./routes/list'))
app.use('/edit', require('./routes/edit'))
app.use('/main', require('./routes/main')) //Para rota que venha da raiz

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('main/login')
})

app.get('/404', (req, res) => {
    res.render('404')
})

app.listen(process.env.PORT || 8081, () => { console.log("Servidor Node Iniciado") })