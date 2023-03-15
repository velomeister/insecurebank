const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'dbuser',
    password: 'insecurebank',
    database: 'bank'
})

module.exports = pool.promise();