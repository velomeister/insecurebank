const db = require('../util/database');

module.exports = class Transfer {
    constructor(id, originEmail, destinationEmail, amount) {
        this.id = id;
        this.originEmail = originEmail;
        this.destinationEmail = destinationEmail;
        this.amount = amount;
    }

    static save(originEmail, destinationEmail, amount) {
        db.execute(`INSERT INTO transfers (originEmail, destinationEmail, amount) VALUES ('${originEmail}', '${destinationEmail}', ${amount})`);
        db.execute(`UPDATE users SET balance = balance - ${amount} WHERE email = '${originEmail}'`);
        db.execute(`UPDATE users SET balance = balance + ${amount} WHERE email = '${destinationEmail}'`);
    }

    static fetchAll() {
        return db.execute('SELECT * FROM transfers');
    }

    static fetchByUser(userEmail) {
        return db.execute(`SELECT * FROM transfers WHERE originEmail = '${userEmail}' OR destinationEmail = '${userEmail}'`);
    }
}