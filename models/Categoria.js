const mongoose = require('mongoose')

const CategoriaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    salario: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('categorias', CategoriaSchema)