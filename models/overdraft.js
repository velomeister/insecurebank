const db = require('../util/database');

module.exports = class Overdraft {
    constructor(id, userEmail, amount) {
        this.id = id;
        this.userEmail = userEmail;
        this.amount = amount;
    }

    static save(userEmail, amount) {
        db.execute(`INSERT INTO overdrafts (userEmail, amount) VALUES ('${userEmail}', ${amount})`);
    }

    static manageOverdraft(requestId, userEmail, isApproved, amount) {
        db.execute(`UPDATE overdrafts SET managed = 1, approved = ${isApproved} WHERE id = ${requestId}`);
        if (isApproved == 1) {
            db.execute(`UPDATE users SET balance = balance + ${amount} WHERE email = '${userEmail}'`);
        }
    }

    static fetchAll() {
        return db.execute('SELECT * FROM overdrafts');
    }

    static fetchByUserAndPendingManagement(userEmail) {
        return db.execute(`SELECT * FROM overdrafts WHERE userEmail = '${userEmail}' AND managed = 0`);
    }

    static fetchByUser(userEmail) {
        return db.execute(`SELECT * FROM overdrafts WHERE userEmail = '${userEmail}'`);
    }

    static fetch(requestId) {
        return db.execute(`SELECT * FROM overdrafts WHERE id = ${requestId}`);
    }
}