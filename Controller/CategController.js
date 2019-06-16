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
    },

    async edit(req, res) {
        const categoria = await Categoria.findOne({ _id: req.body.uid })
            .then((categ) => {
                categ.nome = req.body.nome,
                categ.salario = req.body.salario

                categ.save()
                    .then(() => {
                        req.flash('suc_msg', `Categoria Editada com Sucesso`)
                        res.redirect('/dev/cad/categoria')
                    })
            })
    },

    async delete(req, res) {
        Categoria.deleteOne({ _id: req.params.uid })
            .then(() => {
                req.flash('suc_msg', `Categoria Deletada com Sucesso`)
                res.redirect('/dev/cad/categoria')
            })
            .catch((err) => {
                req.flash('error_msg', `Erro ao tentar Deletar a Cartegoria`)
                console.log("Error Deletar Categoria = " + err)
                res.redirect('/dev/cad/categoria')
            })

    }
}