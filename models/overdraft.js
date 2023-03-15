const db = require('../util/database');

module.exports = class Overdraft {
    constructor(id, userId, amount) {
        this.id = id;
        this.userId = userId;
        this.amount = amount;
    }

    static save(userId, amount) {
        db.execute(`INSERT INTO overdrafts (userId, amount) VALUES (${userId}, ${amount})`);
    }

    static manageOverdraft(requestId, userId, isApproved, amount) {
        db.execute(`UPDATE overdrafts SET managed = 1, approved = ${isApproved} WHERE id = ${requestId}`);
        if (isApproved == 1) {
            db.execute(`UPDATE users SET balance = balance + ${amount} WHERE id = ${userId}`);
        }
    }

    static fetchAll() {
        return db.execute('SELECT * FROM overdrafts');
    }

    static fetchByUser(userId) {
        return db.execute(`SELECT * FROM overdrafts WHERE userId=${userId} AND managed = 0`);
    }

    static fetch(requestId) {
        return db.execute(`SELECT * FROM overdrafts WHERE id = ${requestId}`);
    }
}