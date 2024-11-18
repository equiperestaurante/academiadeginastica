const express = require('express')
const router = express.Router()//modulo  que irá operar com as rotas

    const alunos = require('../models/alunos')
    const planos = require('../models/planos')
    const {where} = require('sequelize')

//criando rotas 
//1ª rota - inserir dados na tabela

router.post('/store',async(req,res)=>{
    const produto = await alunos.create({
        nome: req.body.nome,
        idade: req.body.idade,
        data_inicio: req.body.data_inicio,
        planoId: req.body.planos//esse campo é a chave estrangeira
    })

    if(produto){
        res.redirect('/')
    }
    else{
        res.json({erro:"Não foi possível cadastrar"})
    }
})

//2ª rota - mostrar pagina raiz
router.get('/show',async(req,res)=>{
    res.render('alunos/index')
})

//3ª routar - consultar dados da tabela
router.get('/',async(req,res)=>{
    let produto = await alunos.findAll({include:planos})
    if(produto){
        console.log(produto)
        res.render('alunos/index',{dados:produto})
    }
    else{
        console.log("Não foi possivel exibir os dados")
    }
})

//4ª rota - deletar dados da tabela por id
router.get('/destroy/:id', async(req,res)=>{
    const produto = await alunos.destroy({
        where:{
            id:req.params.id    
        }
    })
    res.redirect('/alunos')
})

//5ª - exibir formulario de cadastro
router.get("/create",async(req,res)=>{
    let produto = await planos.findAll()
    if(produto){
        console.log(produto)
        res.render('alunos/addAlunos',{dados:produto})
    }
    else{
        console.log("Não foi possivel exibir os dados")
        res.redirect('/')
    }
})
module.exports = router
