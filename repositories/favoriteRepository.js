const db = require("../config/db");

class FavoriteRepository {
    async findByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM Favorites WHERE userId = ? ORDER BY id DESC`,
                [userId],
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows);
                }
            );
        });
    }

    async create({ userId, videoId, title, thumbnailUrl }) {
        const createdAt = new Date().toISOString();
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO Favorites (userId, videoId, title, thumbnailUrl, createdAt) VALUES (?, ?, ?, ?, ?)`,
                [userId, videoId, title, thumbnailUrl, createdAt],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.lastID);
                }
            );
        });
    }

    async delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE FROM Favorites WHERE id = ?`, [id], (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

module.exports = new FavoriteRepository();