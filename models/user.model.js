const db = require('./db.config');

class User {
    static getAll(callback) {
        db.query('SELECT * FROM users', (err, results) => {
            if (err) return callback(err, null);
            callback(null, results);
        });
    }

    static getById(id, callback) {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err, null);
            callback(null, results[0] || null);
        });
    }

    static create(data, callback) {
        const { name, email, password } = data;
        db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password || null],
            (err, result) => {
                if (err) return callback(err, null);
                callback(null, { id: result.insertId, ...data });
            }
        );
    }

    static update(id, data, callback) {
        const { name, email, password } = data;
        db.query(
            'UPDATE users SET name=?, email=?, password=? WHERE id=?',
            [name, email, password || null, id],
            (err, result) => {
                if (err) return callback(err, null);
                callback(null, result.affectedRows > 0);
            }
        );
    }

    static delete(id, callback) {
        db.query('DELETE FROM users WHERE id=?', [id], (err, result) => {
            if (err) return callback(err, null);
            callback(null, result.affectedRows > 0);
        });
    }
}

module.exports = User;
