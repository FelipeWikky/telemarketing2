const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./Controller/Auth')(passport)
const { isLogin, isAdmin } = require('./helpers/access')

//Session | Passport | Flash
app.use(session({
	secret: "nodetel",
	resave: true,
	saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//Middleware - Variáveis globais
app.use((req, res, next) => {
	res.locals.suc_msg = req.flash("suc_msg") //Success
	res.locals.error_msg = req.flash("error_msg") //Danger
	res.locals.fail_msg = req.flash("fail_msg") //Warning
	res.locals.error = req.flash('error') // Passport
	//Variáveis de Autenticação
	res.locals.user = req.user || null
	next()
})

//Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//BodyParser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//Cors
app.use(cors())

//Mongoose
const url = 'mongodb+srv://wikky:wikky@cluster0-dfnfs.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(url, {
	useNewUrlParser: true,
}).then(() => console.log(`Servidor MongoDB Aberto`))
	.catch((err) => console.log(`Erro ao abrir o Mongo= ${err}`))

//Routes
app.get('/', (req, res) => { res.render('index') })
app.use('/search', require('./routes/search'))

app.use('/user', require('./routes/user')) //Login e Registro
app.get('/login', (req, res) => res.redirect('/user/login'))
app.get('/registro' || '/cadastro', (req, res) => res.redirect('/user/register'))

app.use('/list', isLogin, require('./routes/list')) //Listar Funcionários básicos

app.get('/404', (req, res) => { res.render('404') })//Route not found

app.use('/dev', isAdmin, require('./routes/dev'))

//Server
app.listen(process.env.PORT || 8081, () => { console.log("Servidor Node Iniciado") })