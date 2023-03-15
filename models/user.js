const db = require('../util/database');

module.exports = class User {
    constructor(id, fullName, email, password, balance) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.balance = balance;
    }

    static save(fullName, email, password, balance) {
        db.execute(`INSERT INTO users (fullName, email, password, balance) VALUES ('${fullName}', '${email}', '${password}', '${balance}')`);
    }

    static update() {
        db.execute(`UPDATE users SET fullName='${this.fullName}', email='${this.email}, password='${this.password}', balance='${this.balance}' WHERE id=${this.id}`)
    }

    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

    static fetchById(userId) {
        return db.execute(`SELECT * FROM users WHERE id = ${userId}`);
    }

    static fetchByEmail(email) {
        return db.execute(`SELECT * FROM users WHERE email = '${email}'`);
    }
}