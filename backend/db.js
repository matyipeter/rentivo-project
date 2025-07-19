const { Pool } = require('pg');

const pool = new Pool({
  user: "peter",
  host: '172.17.0.1',
  database: 'rentivo',
  password: '',
  port: 5432,
});

module.exports = pool;
