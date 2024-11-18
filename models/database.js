const sequelizeDb = require("sequelize")
const sequelizeConfig = new sequelizeDb(
    'academia_db', //o nome do banco de dados
    'root', //o usuário do banco de dados
    '', //a senha do banco de dados
    {
        dialect:'sqlite',
        storage: './academia_db.sqlite',//o nome do arquivo ode será salvo o banco
    }
)
module.exports = {sequelizeDb, sequelizeConfig}