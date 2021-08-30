///Подключение к БД.

const {Pool} = require('pg');
const pool = new Pool({
    user: "postgres",
    password: "0000",
    host: "localhost",
    port: 5432,
    database: "library_db"
});

module.exports = pool;

