const mongoose = require('mongoose')

let user = 'wikky'
let password = 'wikky'
let database = 'telemarketing';
let url = 'mongodb+srv://wikky:wikky@cluster0-dfnfs.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(url, {
    useNewUrlParser: true,
})
    .then( () => console.log(`Servidor MongoDB Aberto`))
    .catch( (err) => console.log(`Erro ao abrir o Mongo= ${err}`))