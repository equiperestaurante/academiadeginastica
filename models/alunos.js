const database = require('./database'); // Importando o banco de dados
const planos = require('./planos'); // Importando a tabela planos

// Criando a tabela de alunos
const alunos = database.sequelizeConfig.define(
    'alunos', // Nome da tabela
    {
        nome: {
            type: database.sequelizeDb.STRING,
            allowNull: false
        },
        idade: {
            type: database.sequelizeDb.INTEGER,
            allowNull: false
        },
        data_inicio: {
            type: database.sequelizeDb.DATE,
            allowNull: false
        }
    }
);

// Criando a chave estrangeira entre 'alunos' e 'planos'
// Estamos dizendo que um plano pode ter muitos alunos
planos.hasMany(alunos, {
    foreignKey: 'planoId', // Chave estrangeira na tabela de alunos
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Definindo que um aluno pertence a um único plano
alunos.belongsTo(planos, {
    foreignKey: 'planoId' // A chave estrangeira que faz referência à tabela planos
});

// Sincronizando a tabela alunos com o banco de dados
alunos.sync()
module.exports = alunos