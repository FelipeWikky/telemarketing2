const Funcionario = require('../models/Funcionario')
const Categoria = require('../models/Categoria')
const CategController = require('../Controller/CategController')

module.exports = {
    async list(req, res) {
        const funcionarios = await Funcionario.find().sort('-createdAt')
        return funcionarios
    },

    async create(req, res) {
        const { matr, nome, nasc, genero, admissao, categoria } = req.body

        var erros = []
        if (matr == "" || typeof matr == undefined || matr == null) {
            erros.push({ msg: `Matrícula deve ser Informado` })
        }
        if (nome == "" || typeof nome == undefined || nome == null) {
            erros.push({ msg: `Nome deve ser Informado` })
        }
        if (nasc == "" || typeof nasc == undefined || nasc == null) {
            erros.push({ msg: `Data de Nascimento deve ser Informado` })
        }
        if (admissao == "" || typeof admissao == undefined || admissao == null) {
            //
        }
        if(categoria == "0") {
            erros.push({ msg: `Esta Categoria não pode ser Utilizada. Cadastre uma Categoria` })
        }
        const funcionario = await Funcionario.findOne({ 'matricula': matr })
        if (funcionario) {
            erros.push({ msg: `Já existe Funcionário com esta Matrícula` })
        }
        
        if (erros.length > 0) {
            res.render('cad/funcionario', { erros: erros })
        }
        else {
            const funcionario = await Funcionario.create({
                matricula: matr,
                nome,
                dtNasc: nasc,
                genero,
                dtAdmissao: admissao,
                categoria: categoria
            })
                .then(() => {
                    Categoria.find()
                        .then((cats) => {
                            req.flash('suc_msg', `Funcionario [${matr}] Registrado com Sucesso`)
                            res.redirect('/cad/funcionario')
                        })
                })
                .catch((err) => {
                    Categoria.find()
                        .then((cats) => {
                            req.flash('error_msg', 'Erro ao Registrar Funcionário. Tente novamamente mais Tarde.')
                            res.redirect('/cad/funcionario')
                        })
                    console.log(err)
                })
            console.log(funcionario)
        }
    },

    async edit(req, res) {
        const funcionario = await Funcionario.findOne({_id:req.body.uid})
            .then((func) => {
                func.nome = req.body.nome,
                func.dtNasc = req.body.nasc,
                func.genero = req.body.genero,
                func.dtAdmissao = req.body.admissao,
                func.categoria = req.body.categoria

                func.save()
                    .then(()=>{
                        Categoria.find()
                            .then((cats) => {
                                req.flash('suc_msg', `Funcionário [${func.matricula}] Editado com Sucesso.`)
                                res.redirect(`/dev/info/${func._id}`)
                            })
                    })
                    .catch((err)=> {
                        console.log("Erro ao firmar a Edição = " + err)
                        req.flash('error_msg', `Erro ao confirmar Edição. Tente novamente mais tarde.`)
                        //res.render(`info/one`, {func: func, cats: callC() })
                    })
            })
            .catch((err)=> console.log("Erro ao iniciar edição do Funcionario ", err))
    },

    async delete(req, res) {
        Funcionario.deleteOne({ _id: req.params.uid })
            .then(()=> {
                req.flash('suc_msg', `Funcionário Deletado com Sucesso`)
                res.redirect('/dev/cad/funcionario')
            })
            .catch((err)=> {
                req.flash('error_msg', `Erro ao tentar Deletar o Funcionário`)
                res.redirect('/dev/cad/funcionario')
            })
            
    }
}