const Categoria = require('../models/Categoria')

module.exports = {
     async list(){
        const categorias = await Categoria.find()
        return categorias
    },
    async index(req, res) {
        const categorias = await Categoria.find()
        return categorias
    },

    async create(req, res){
        const {categ, nome, salario} = req.body

        const categoria = await Categoria.create({
            idCateg: categ,
            nome: nome,
            salario: salario
        })
            .then ( () => res.render('cad/categoria', { msg:`Categoria Registrada com Sucesso.` }))
            .catch( (err) => {
                res.render('cad/categoria', { msg: `Erro ao Registrar Categoria. Tente novamaente mais Tarde.` })  
                console.log(err)
            })
        console.log(categoria)

        
    }
}