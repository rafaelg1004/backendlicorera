const db = require('../db');

class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
    this.db = db;
  }

  async findAll(limit = 50, offset = 0) {
    const query = `SELECT * FROM ${this.tableName} ORDER BY id ASC LIMIT $1 OFFSET $2`;
    const result = await this.db.query(query, [limit, offset]);
    return result.rows;
  }

  async findById(id) {
    const result = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    return result.rows[0];
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
    const query = `UPDATE ${this.tableName} SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
    const result = await this.db.query(query, [...values, id]);
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.db.query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`, [id]);
    return result.rows[0];
  }
}

module.exports = BaseRepository;
