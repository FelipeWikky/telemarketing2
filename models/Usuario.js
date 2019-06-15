const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:String,
    senha:String,
    nome:String,
    access:{
        type:Number,
        default: 0
    },
    palavraSecret:{
        type: String,
        default: 'node'
    }
},{timestamps:true}
)

module.exports = mongoose.model('usuarios', UserSchema)