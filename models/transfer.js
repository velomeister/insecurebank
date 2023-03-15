const db = require('../util/database');

module.exports = class Transfer {
    constructor(id, originId, destinationId, amount) {
        this.id = id;
        this.originId = originId;
        this.destinationId = destinationId;
        this.amount = amount;
    }

    static save(originId, destinationId, amount) {
        db.execute(`INSERT INTO transfers (originId, destinationId, amount) VALUES (${originId}, ${destinationId}, ${amount})`);
        db.execute(`UPDATE users SET balance = balance - ${amount} WHERE id = ${originId}`);
        db.execute(`UPDATE users SET balance = balance + ${amount} WHERE id = ${destinationId}`);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM transfers');
    }

    static fetchByUser(userId) {
        return db.execute(`SELECT * FROM transfers WHERE originId=${userId} OR destinationId=${userId}`);
    }
}