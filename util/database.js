const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'insecurebank-db.ceqhyb7flfi2.us-east-1.rds.amazonaws.com',
    user: 'dbuser',
    password: 'insecurebank',
    database: 'bank'
})

module.exports = pool.promise();