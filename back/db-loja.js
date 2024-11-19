const sqlite3 = require('sqlite3');  // Importa o módulo sqlite3 para interagir com o banco de dados SQLite
const path = require('path');        // Importa o módulo path para manipular caminhos de arquivos

const folder = 'data';               // Nome da pasta onde o banco de dados será armazenado
const fileName = 'lojacarros.db';    // Nome do arquivo do banco de dados
const dbPath = path.resolve(__dirname, folder, fileName); // Caminho absoluto para o arquivo do banco de dados

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Faiô :(', err);  // Exibe erro caso a conexão falhe
    } else {
        console.log('Conectou :)');     // Exibe mensagem de sucesso ao conectar com o banco de dados
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Carros (
            id      INTEGER         PRIMARY KEY AUTOINCREMENT, 
            modelo  VARCHAR(60)     NOT NULL, 
            ano     INTEGER         NOT NULL,
            cor     VARCHAR(60),
            preco   DECIMAL(10, 2),
            image   VARCHAR(255)
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS Users (
            id          INTEGER         PRIMARY KEY AUTOINCREMENT,
            username    VARCHAR(60)     NOT NULL UNIQUE,
            password    VARCHAR(255)    NOT NULL,
            email       VARCHAR(255)    UNIQUE,
            created_at  DATETIME        DEFAULT CURRENT_TIMESTAMP
        );
    `);
});


module.exports = db;
