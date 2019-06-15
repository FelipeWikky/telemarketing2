const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:String,
    senha:String,
    nome:String,
    acess:{
        type:Number,
        default: 0
    }
},{timestamps:true}
)

module.exports = mongoose.model('usuarios', UserSchema)