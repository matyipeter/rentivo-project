const { Pool } = require('pg');

const pool = new Pool({
  user: 'peter',
  host: 'localhost',
  database: 'rentivo',
  password: '',
  port: 5432,
});

module.exports = pool;