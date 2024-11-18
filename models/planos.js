const {sequelizeDb, sequelizeConfig} = require('./database')

const planos = sequelizeConfig.define(
    'planos',
    {
        nome_do_plano:{
            type:sequelizeDb.STRING
        },
        descricao:{
            type:sequelizeDb.TEXT
        },
        preco:{
            type:sequelizeDb.DECIMAL(10,2)
        }
    }
)
planos.sync()
module.exports = planos