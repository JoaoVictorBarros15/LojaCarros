const sqlite3 = require('sqlite3');                                     // Importa o módulo sqlite3 para interagir com o banco de dados SQLite
const path = require('path');                                           // Importa o módulo path para manipular caminhos de arquivos

const folder = 'data';                                                  // Nome da pasta onde o banco de dados será armazenado
const fileName = 'lojacarros.db';                                          // Nome do arquivo do banco de dados
const dbPath = path.resolve(__dirname, folder, fileName);               // Caminho absoluto para o arquivo do banco de dados

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Faiô :(', err);                                  // Exibe erro caso a conexão falhe
    } else {
        console.log('Conectou :)');                                     // Exibe mensagem de sucesso ao conectar com o banco de dados
    }
});

db.serialize(() => {
    db.run(`
      create table if not exists Carros (
        id      integer         primary key AUTOINCREMENT,
        nome    varchar(60)     not null,
        marca    varchar(60)     not null,
        ano    date            not null,
        price    decimal(6,3),
        cor     varchar(60),
        image   varchar(255)
      );
    `);
  
    db.run(`
      create table if not exists Users (
        id          integer         primary key AUTOINCREMENT,
        username    varchar(60)     not null unique,
        password    varchar(255)    not null,
        email       varchar(255)    unique,
        created_at  datetime        default current_timestamp
      );
    `);
  });

module.exports = db; 
