const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FuncionarioSchema = new Schema({
    matricula:{
        type: String,
        primaryKey: true
    },
    nome:{
        type: String,
        required: true
    },
    dtNasc:{
        type: String,
        require: true,
        default: Date.now
    },
    genero:{
        type:String,
        required: true
    },
    dtAdmissao:{
        type:String,
        require: true,
        default: Date.now
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'categorias'
    }
}, { timestamps: true })

module.exports = mongoose.model('funcionarios', FuncionarioSchema)