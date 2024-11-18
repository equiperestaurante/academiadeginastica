const express = require('express')
const router = express.Router() //modulo que ira trabalhar com as rotas

const alunos = require('../models/alunos')
const planos = require('../models/planos')
const {where} = require('sequelize')

//criando rotas
//1ª rota inserir dados na tabela

router.post('/inserir', async (req, res) => {
    const resultado = await planos.create({
        nome_do_plano: req.body.nome_do_plano,
        descricao: req.body.descricao,
        preco: req.body.preco

    })
    if(resultado){
        res.redirect('/')
    }
    else{
        res.json({erro:"Não foi possivel cadastar"})
    }
})

//2ª rota mostrar pagina raiz
router.get('/base', async (req, res) => {
    res.render('planos/index')
})

//3ª rota - consultar os dados da tabela
router.get('/', async (req, res) => {
    let resultado = await planos.findAll()
    if(resultado){
        console.log(resultado)
        res.render('planos/index', {dados:resultado})
    }
    else{
        res.json({erro:"Não foi possivel consultar os dados"})
    }
})

//4ª rota - deletar os dados da tabela por id
router.get('/deletar/:id', async (req, res) => {
    const resultado = await planos.destroy({
        where:{
            id:req.params.id//estamos recebendo o id via parâmetro, que está sendo passado na rota, no caso é o :id que estamos recebendo.
        }
    })
    res.redirect('/planos')
})

//5ª rota - exibir o formulario de cadastro
router.get("/criar",async(req,res)=>{
    let resultado = await planos.findAll()
    if(resultado){
        console.log(resultado)
        res.render('planos/addPlanos',{dados:resultado})
    }
    else{
        console.log("Não foi possivel exibir os dados")
        res.redirect('/')
    }    
})
module.exports = router