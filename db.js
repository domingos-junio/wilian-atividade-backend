// db.js
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // se você colocou senha no XAMPP, adicione aqui
  database: 'minha_api'
});

module.exports = pool.promise();
